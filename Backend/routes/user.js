const authenticateToken = require("../middleware/authentication");
const express = require("express");
const router = express.Router();
//const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = (db) => {
  router.put("/update", authenticateToken, (req, res) => {
    const {
      nombre,
      apellido,
      tipoDocumento,
      numDocumento,
      genero,
      email,
      telefono,
      password,
    } = req.body;

    // Validación para asegurarse de que 'numDocumento' esté presente
    if (!numDocumento) {
      res.status(400).send("Document number is required");
      return;
    }

    // Construcción de la consulta SQL de actualización
    const query = `
      UPDATE usuarios 
      SET nombre = ?, apellido = ?, tipoDocumento = ?, genero = ?, email = ?, telefono = ?, password = ?
      WHERE numDocumento = ?
    `;

    // Ejecutar la consulta con los datos proporcionados
    db.query(
      query,
      [
        nombre,
        apellido,
        tipoDocumento,
        genero,
        email,
        telefono,
        password,
        numDocumento,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating data:", err);
          res.status(500).send("Error updating user");
          return;
        }

        // Verificar si algún registro fue actualizado
        if (results.affectedRows === 0) {
          res.status(404).send("User not found");
          return;
        }

        res.status(200).send("User updated successfully");
      }
    );
  });

  router.get("/profile", authenticateToken, (req, res) => {
    console.log("Profile route accessed");
    console.log("User from token:", req.user);

    if (!req.user || !req.user.id) {
      console.error("No user ID found in token");
      return res.status(400).json({ message: "Invalid token content" });
    }

    const userId  = req.user.id;

    console.log("Fetching profile for user ID:", userId);

    db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        console.log("Query results:", results);

        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        res.json({
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          tipoDocumento: user.tipoDocumento,
          genero: user.genero,
          email: user.email,
          numDocumento: user.numDocumento,
          telefono: user.telefono,
          password: user.password,
        });
      }
    );
  });

  // Nueva ruta para solicitar restablecimiento de contraseña
  router.post("/forgot-password", (req, res) => {
    const { email } = req.body;

    db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Database error", error: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Email not found" });
        }

        const user = results[0];

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          to: email,
          from: process.env.EMAIL_USER,
          subject: "Password Reset",
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-password?email=${email}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.error("Error sending email:", err);
            return res.status(500).send("Error sending email");
          }
          res.status(200).send("Recovery email sent");
        });
      }
    );
  });

  // Nueva ruta para restablecer la contraseña
  router.post("/reset-password", (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Database error", error: err.message });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Email not found" });
        }

        db.query(
          "UPDATE usuarios SET password = ? WHERE email = ?",
          [password, email],
          (err) => {
            if (err) {
              console.error("Error updating password:", err);
              return res.status(500).json({ message: "Error updating password", error: err.message });
            }
            res.status(200).json({ message: "Password reset successfully" });
          }
        );
      }
    );
  });

  router.delete('/profile', authenticateToken, (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Invalid token content' });
    }
  
    const userId = req.user.id;
  
    // Consulta SQL para eliminar las citas del usuario
    const deleteCitasSql = 'DELETE FROM citas WHERE idUsuario = ?';
  
    // Consulta SQL para eliminar al usuario
    const deleteUsuarioSql = 'DELETE FROM usuarios WHERE id = ?';
  
    // Ejecutar la consulta para eliminar citas
    db.query(deleteCitasSql, [userId], (errCitas, resultsCitas) => {
      if (errCitas) {
        console.error('Error deleting citas:', errCitas);
        return res.status(500).json({ message: 'Database error', error: errCitas.message });
      }
  
      // Ejecutar la consulta para eliminar al usuario si las citas se eliminaron correctamente
      db.query(deleteUsuarioSql, [userId], (errUsuario, resultsUsuario) => {
        if (errUsuario) {
          console.error('Error deleting usuario:', errUsuario);
          // Puedes decidir revertir la operación de eliminación de citas aquí si es necesario
          return res.status(500).json({ message: 'Database error', error: errUsuario.message });
        }
  
        if (resultsUsuario.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json({ message: 'User and associated citas deleted successfully' });
      });
    });
  });

  router.get("/citas", authenticateToken, (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Invalid token content" });
    }

    const userId = req.user.id;

    db.query(
      "SELECT * FROM citas WHERE idUsuario = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        res.json(results);
      }
    );
  });

  router.delete("/citas/:id", authenticateToken, (req, res) => {
    const citaId = req.params.id;
    const userId = req.user.id;

    db.query(
      "DELETE FROM citas WHERE id = ? AND idUsuario = ?",
      [citaId, userId],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Cita not found" });
        }

        res.json({ message: "Cita deleted successfully" });
      }
    );
  });

  return router;
};
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.put("/update", (req, res) => {
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

  router.get("/profile", (req, res) => {
    console.log("Profile route accessed");
    console.log("User from token:", req.user);

    if (!req.user || !req.user.userId) {
      console.error("No user ID found in token");
      return res.status(400).json({ message: "Invalid token content" });
    }

    const { userId } = req.user;

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
        });
      }
    );
  });
  return router;
};

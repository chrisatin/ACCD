const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication");

module.exports = (db) => {
  router.post(
    "/agendar",
    (req, res, next) => {
      console.log("Request received at /citas/agendar");
      console.log("User from token:", req.user);
      next();
    },
    authenticateToken,
    (req, res) => {
      console.log("After authentication middleware");
      console.log("User ID:", req.user ? req.user.id : "Not available");

      const {
        tipo_consulta,
        fecha_cita,
        hora_cita,
        medico,
        modalidad_consulta,
        idMedico,
      } = req.body;

      const idUsuario = req.user.id;

      console.log("idUsuario:", idUsuario);

      // const idUsuario = req.user.id; // Asumiendo que el middleware de autenticación añade el id del usuario a req.user

      const query =
        "INSERT INTO citas (tipo_consulta, fecha_cita, hora_cita, medico, modalidad_consulta, idMedico, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)";
      console.log("Datos recibidos:", req.body);
      db.query(
        query,
        [
          tipo_consulta,
          fecha_cita,
          hora_cita,
          medico,
          modalidad_consulta,
          idMedico,
          idUsuario,
        ],
        (err, result) => {
          if (err) {
            console.error("SQL Query:", query);
            console.error("Valores:", [
              tipo_consulta,
              fecha_cita,
              hora_cita,
              medico,
              modalidad_consulta,
              idMedico,
              idUsuario,
            ]);
            res.status(500).json({
              error: "Error al agendar la cita",
              details: err.message,
            });
            return;
          }
          res.status(201).json({
            message: "Cita agendada exitosamente",
            id: result.insertId,
          });
        }
      );
    }
  );

  return router;
};

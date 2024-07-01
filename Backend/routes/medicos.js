const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:especialidad", (req, res) => {
    const especialidad = req.params.especialidad;
    const query = `
              SELECT m.idMedico, m.nombreMedico 
              FROM medicos m
              JOIN medicos_especialidades me ON m.idMedico = me.idMedico
              JOIN especialidad e ON me.idEspecialidad = e.idEspecialidad
              WHERE e.especialidad = ?
            `;

    db.query(query, [especialidad], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    }); 
  });
  return router;
};
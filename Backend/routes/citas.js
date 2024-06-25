const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/agendar', (req, res) => {
    const { tipo_consulta, fecha_cita, hora_cita, medico, modalidad_consulta } = req.body;
    
    const query = 'INSERT INTO citas (tipo_consulta, fecha_cita, hora_cita, medico, modalidad_consulta) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [tipo_consulta, fecha_cita, hora_cita, medico, modalidad_consulta], (err, result) => {
      if (err) {
        console.error('Error al agendar la cita:', err);
        res.status(500).json({ error: 'Error al agendar la cita' });
        return;
      }
      res.status(201).json({ message: 'Cita agendada exitosamente', id: result.insertId });
    });
  });

  return router;
};
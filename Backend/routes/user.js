const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/profile', (req, res) => {
        console.log('Profile route accessed');
        console.log('User from token:', req.user);
      
        if (!req.user || !req.user.userId) {
          console.error('No user ID found in token');
          return res.status(400).json({ message: 'Invalid token content' });
        }
      
        const { userId } = req.user;
      
        console.log('Fetching profile for user ID:', userId);
      
        db.query('SELECT * FROM usuarios WHERE id = ?', [userId], (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
          }
      
          console.log('Query results:', results);
      
          if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
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
            telefono: user.telefono
          });
        });
      });
  return router;
}


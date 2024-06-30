const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (db, secretKey) => {
  router.post('/register', (req, res) => {
    const { nombre, apellido, tipoDocumento, numDocumento, genero, email, telefono, password } = req.body;
    const query = 'INSERT INTO usuarios (nombre, apellido, tipoDocumento, numDocumento, genero, email, telefono, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [nombre, apellido, tipoDocumento, numDocumento, genero, email, telefono, password], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error registering user');
        return;
      }
      res.status(200).send('User registered successfully');
    });
  }); 

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('Error executing database query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const user = results[0];
      
      // Generar JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
      
      res.json({ token });
    });

  });

  return router;
};
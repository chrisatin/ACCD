const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();
const axios = require('axios');

const contactRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const citasRoutes = require('./routes/citas');  
const medicosRouter = require('./routes/medicos');
const DatabaseRouter = require('./initializeDB');

const app = express();
const port = 3001;
const secretKey = "your_jwt_secret_key";

// Middleware setup
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // URL de frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
  
// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// usa la rutas
app.use('/auth', authRoutes(db, secretKey));
app.use('/user', userRoutes(db));
app.use('/citas', citasRoutes(db));
app.use('/medicos', medicosRouter(db));
app.use('/database', DatabaseRouter(db));
app.use('/api', contactRoutes());

async function BaseDeDatos() {
  try {
    const response = await axios.post('http://localhost:3001/database');
    console.log(response.data); // Opcional: Mostrar la respuesta
  } catch (error) {
    console.error('Error al reiniciar la base de datos:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);

  // Llamar a la función para reiniciar la base de datos al iniciar
  BaseDeDatos().catch(error => {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1); // Salir con código de error si falla la inicialización
  });
});
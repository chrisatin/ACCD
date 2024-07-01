const express = require('express');
const router = express.Router();

function DatabaseRouter(db) {
    router.post('/', (req, res) => {
        const dbName = process.env.DB_NAME;
    
        // Dropear la base de datos si existe
        db.query(`DROP DATABASE IF EXISTS ${dbName}`, (err) => {
          if (err) {
            console.error('Error al eliminar la base de datos:', err);
            return res.status(500).json({ error: 'Error al eliminar la base de datos' });
          }
    
          // Crear la base de datos nuevamente
          db.query(`CREATE DATABASE ${dbName}`, (err) => {
            if (err) {
              console.error('Error al crear la base de datos:', err);
              return res.status(500).json({ error: 'Error al crear la base de datos' });
            }
    
            // Seleccionar la base de datos recién creada
            db.query(`USE ${dbName}`, (err) => {
              if (err) {
                console.error('Error al seleccionar la base de datos:', err);
                return res.status(500).json({ error: 'Error al seleccionar la base de datos' });
              }
    
              // Crear las tablas y agregar datos iniciales
              const sqlScript = `
            CREATE TABLE citas (
              id int(11) NOT NULL AUTO_INCREMENT,
              tipo_consulta enum('Medicina General','Pediatria','Ginecología','Cardiología','Odontología','Oftalmología','Psicología','Otorrinolaringología') NOT NULL,
              fecha_cita date NOT NULL,
              hora_cita time NOT NULL,
              medico varchar(100) NOT NULL,
              modalidad_consulta enum('Virtual','Presencial') NOT NULL,
              idMedico int(11) DEFAULT NULL,
              idUsuario int(11) DEFAULT NULL,
              PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            CREATE TABLE especialidad (
              idEspecialidad int(11) NOT NULL,
              especialidad varchar(100) NOT NULL,
              PRIMARY KEY (idEspecialidad)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            INSERT INTO especialidad (idEspecialidad, especialidad) VALUES
            (1, 'Medicina General'),
            (2, 'Pediatria'),
            (3, 'Ginecologia'),
            (4, 'Cardiologia'),
            (5, 'Odontologia'),
            (6, 'Oftalmologia'),
            (7, 'Psicologia'),
            (8, 'Otorrinolaringologia');

            CREATE TABLE medicos (
              idMedico int(11) NOT NULL,
              nombreMedico varchar(100) NOT NULL,
              PRIMARY KEY (idMedico)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            INSERT INTO medicos (idMedico, nombreMedico) VALUES
            (1, 'Dr. Juan Pérez'),
            (2, 'Dra. María Rodríguez'),
            (3, 'Dr. Carlos Gómez'),
            (4, 'Dra. Ana Martínez');

            CREATE TABLE medicos_especialidades (
              idMedico int(11) NOT NULL,
              idEspecialidad int(11) NOT NULL,
              PRIMARY KEY (idMedico,idEspecialidad),
              KEY idEspecialidad (idEspecialidad)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            INSERT INTO medicos_especialidades (idMedico, idEspecialidad) VALUES
            (1, 1),
            (2, 2),
            (2, 3),
            (1, 4),
            (3, 5),
            (4, 6),
            (4, 7),
            (3, 8);

            CREATE TABLE usuarios (
              id int(11) NOT NULL AUTO_INCREMENT,
              nombre varchar(255) NOT NULL,
              apellido varchar(255) NOT NULL,
              tipoDocumento varchar(50) NOT NULL,
              numDocumento varchar(50) NOT NULL,
              genero varchar(50) NOT NULL,
              email varchar(255) NOT NULL,
              telefono varchar(50) NOT NULL,
              password varchar(255) NOT NULL,
              PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

            ALTER TABLE citas
              ADD CONSTRAINT citas_ibfk_1 FOREIGN KEY (idMedico) REFERENCES medicos (idMedico),
              ADD CONSTRAINT citas_ibfk_2 FOREIGN KEY (idUsuario) REFERENCES usuarios (id);

            ALTER TABLE medicos_especialidades
              ADD CONSTRAINT medicos_especialidades_ibfk_1 FOREIGN KEY (idMedico) REFERENCES medicos (idMedico),
              ADD CONSTRAINT medicos_especialidades_ibfk_2 FOREIGN KEY (idEspecialidad) REFERENCES especialidad (idEspecialidad);
         
              `;
    
              const queries = sqlScript.split(';').filter(query => query.trim() !== '');

              // Ejecutar cada consulta por separado
              queries.forEach(query => {
                db.query(query, (err) => {
                  if (err) {
                    console.error('Error al ejecutar el script SQL:', err);
                    return res.status(500).json({ error: 'Error al crear las tablas y agregar datos iniciales' });
                  }
                });
              });
    
              res.json({ message: 'Base de datos reiniciada y configurada exitosamente' });
            });
          });
        });
      });
    
      return router;
    }
module.exports = DatabaseRouter;
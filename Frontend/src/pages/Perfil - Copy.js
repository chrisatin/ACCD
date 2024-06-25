import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data with token:', token);
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log('User data received:', data);
          setUserData(data);
          setEditableData(data); // Initialize editableData with userData
        } else {
          console.error('Error response:', response.status, data);
          
          if (response.status === 401) {
            console.error('Authentication token is missing');
          } else if (response.status === 403) {
            console.error('Authentication token is invalid');
          } else {
            console.error('Server error:', data.message);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setEditableData({
      ...editableData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // Aquí iría la lógica para guardar los datos editados
      console.log('Guardando datos:', editableData);
      // TODO: Implementar la llamada a la API para guardar los datos
    } else {
      // Fetch los datos actualizados de la base de datos
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setEditableData(data);
        } else {
          console.error('Error al obtener los datos actualizados');
        }
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteUser = () => {
    // Here you would normally delete the user
    console.log('Deleting user');
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={editableData.nombre || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={editableData.apellido || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Tipo de documento:
          <input
            type="text"
            name="tipoDocumento"
            value={editableData.tipoDocumento || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Número de documento:
          <input
            type="text"
            name="numDocumento"
            value={editableData.numDocumento || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Género:
          <input
            type="text"
            name="genero"
            value={editableData.genero || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={editableData.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={editableData.telefono || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>
      <br />
      <button onClick={handleEditToggle}>
  {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
</button>
      <button onClick={handleDeleteUser} style={{ marginLeft: '10px' }}>
        Eliminar Usuario
      </button>
    </div>
  );
};

export default Perfil;
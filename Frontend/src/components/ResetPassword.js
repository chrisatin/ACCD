import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import "../Estilos/ResetPassword.css";

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const query = new URLSearchParams(location.search);
  const email = query.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("La contraseña debe ser la misma en ambos campos, repítalo nuevamente.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <label>
          Nueva contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Repetir contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ResetPassword;
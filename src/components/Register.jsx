import React, { useState } from 'react';
import { auth } from '../services/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registro exitoso');
      navigate('/register');
    } catch (error) {
      console.error("Error en el registro:", error.code, error.message);
      alert("Error: " + error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Registrarse</button>
      </form>
      <button className="back-button" onClick={handleLoginRedirect}>Volver a Iniciar Sesión</button>
    </div>
  );
};

export default Register;
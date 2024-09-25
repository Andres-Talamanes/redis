import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase/firebase.js';
import { signOut } from 'firebase/auth';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    edad: ''
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      // Limpia el formulario o maneja el éxito
      setFormData({ nombre: '', apellido: '', correo: '', edad: '' });
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/other-page')}>Otra Página</li>
          <li onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Este es tu panel de control.</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nombre" 
            placeholder="Nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="apellido" 
            placeholder="Apellido" 
            value={formData.apellido} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="correo" 
            placeholder="Correo" 
            value={formData.correo} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            name="edad" 
            placeholder="Edad" 
            value={formData.edad} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;

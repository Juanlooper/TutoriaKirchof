import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, BookOpen, PenTool, CheckCircle, AlertTriangle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-logo">
          <Zap className="text-accent" size={28} />
          <span style={{ fontWeight: 700, fontSize: '1.25rem', marginLeft: '0.5rem' }}>Leyes de Kirchhoff</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')} end>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/teoria" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <BookOpen size={18} /> Teoría
            </NavLink>
          </li>
          <li>
            <NavLink to="/ejemplos" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <CheckCircle size={18} /> Ejemplos
            </NavLink>
          </li>
          <li>
            <NavLink to="/ejercicios" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <PenTool size={18} /> Ejercicios
            </NavLink>
          </li>
          <li>
            <NavLink to="/respuestas" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <AlertTriangle size={18} /> Errores
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

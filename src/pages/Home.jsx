import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroCircuit from '../components/ui/HeroCircuit';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-fade-in"
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', background: 'linear-gradient(to right, var(--secondary-color), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Leyes de Kirchhoff
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Guía interactiva y visual para dominar nodos, mallas, signos y ecuaciones. Material didáctico por Juan Rodriguez.
        </p>
      </div>

      <HeroCircuit />

      <div className="grid grid-cols-2 mt-4" style={{ gap: '2rem', marginTop: '3rem' }}>
        <div className="glass-panel text-center">
          <h2>Teoría Fundamental</h2>
          <p>Domina los conceptos de nodo, rama y malla. Aprende cómo recorrer mallas sin perderte con los signos y el algoritmo seguro para exámenes.</p>
          <button className="btn-primary mt-4" onClick={() => navigate('/teoria')}>Estudiar Teoría</button>
        </div>
        <div className="glass-panel text-center">
          <h2>Práctica Resuelta</h2>
          <p>Explora 4 problemas ilustrativos paso a paso y 10 ejercicios de asignación práctica resueltos con simulaciones interactivas.</p>
          <button className="btn-secondary mt-4" onClick={() => navigate('/ejemplos')}>Ver Ejemplos</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

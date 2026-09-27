import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroCircuit = () => {
  const reducedMotion = useReducedMotion();
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 800 300" style={{ opacity: 0.6 }}>
        {/* Grilla sutil */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Nodos y ramas */}
        <motion.path 
          d="M 200 150 L 400 50 L 600 150 L 400 250 Z" 
          fill="none" 
          stroke="var(--secondary-color)" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0 : 2, ease: "easeInOut", repeat: reducedMotion ? 0 : Infinity, repeatType: "reverse" }}
        />
        
        <motion.path 
          d="M 200 150 L 600 150" 
          fill="none" 
          stroke="var(--accent-color)" 
          strokeWidth="3"
          strokeDasharray="10 10"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: "linear", repeat: reducedMotion ? 0 : Infinity }}
        />
        
        {/* Nodos */}
        {[
          { x: 200, y: 150 },
          { x: 400, y: 50 },
          { x: 600, y: 150 },
          { x: 400, y: 250 },
        ].map((pos, i) => (
          <circle key={i} cx={pos.x} cy={pos.y} r="8" fill="var(--primary-color)" stroke="white" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
};

export default HeroCircuit;

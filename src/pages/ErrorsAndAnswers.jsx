import React from 'react';
import { motion } from 'framer-motion';
import { circuits } from '../data/circuits';
import { formatCurrent, solveCircuit } from '../lib/circuitSolver';

const ErrorsAndAnswers = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-fade-in">
      <h1 className="text-center mb-4 text-danger">5. Errores que más puntos cuestan</h1>
      
      <div className="glass-panel mb-4" style={{ borderLeft: '4px solid var(--danger)' }}>
        <ul>
          <li className="mb-2"><strong>Cambiar la dirección</strong> de una corriente a mitad del procedimiento. La dirección supuesta se mantiene hasta resolver.</li>
          <li className="mb-2"><strong>Tomar siempre la batería como positiva.</strong> El signo depende de si la atraviesas de - a + o de + a -.</li>
          <li className="mb-2">Usar <em>IR</em> sin revisar si recorres la resistencia a favor o en contra de la corriente.</li>
          <li className="mb-2">Sumar resistencias que no están realmente en serie porque existe un nodo con una ramificación entre ellas.</li>
          <li className="mb-2">Inventar una corriente distinta cada vez que recorres una resistencia compartida. Usa su misma corriente de rama y obtén las sustituciones con la ley de nodos.</li>
          <li className="mb-2"><strong>Borrar el signo negativo</strong> de una corriente. Ese signo contiene información física: la dirección real es la opuesta.</li>
          <li className="mb-2"><strong>No comprobar.</strong> Una sola KCL y una sola KVL verificadas suelen detectar casi todos los errores de signo.</li>
        </ul>
        <div className="glass-panel-light mt-4 text-text-light">
          <strong>Recomendación de estudio:</strong> primero practica únicamente la lectura de signos durante 10 minutos (sin resolver sistemas). Después toma un circuito y escribe KCL/KVL. Solo al final realiza el álgebra. Separar "modelado del circuito" de "resolución algebraica" reduce mucho los errores.
        </div>
      </div>

      <h2 className="text-center mb-4 text-success mt-4">4. Tabla rápida de respuestas - Práctica #14</h2>
      <div className="glass-panel">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Problema</th>
              <th>Corrientes con signo según las referencias de cada diagrama</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => {
              const circuit = circuits[`practice${i + 1}`];
              const { currents } = solveCircuit(circuit);
              return <tr key={circuit.id}><td>{i + 1}</td><td>{circuit.branches.filter(b => b.label).map(b => `${b.label} = ${formatCurrent(currents[b.id], circuit.unit)}`).join('; ')}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ErrorsAndAnswers;

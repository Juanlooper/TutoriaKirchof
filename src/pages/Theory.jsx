import React from 'react';
import { motion } from 'framer-motion';
import { MathBlock, MathInline } from '../components/ui/MathText';

const Theory = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-fade-in">
      <h1 className="text-center mb-4">1. Teoría que debes dominar</h1>
      <p className="text-center mb-4" style={{ color: '#94a3b8' }}>
        El objetivo de las leyes de Kirchhoff es resolver circuitos que ya no pueden reducirse únicamente con asociaciones serie/paralelo. La idea central es combinar conservación de carga (nodos), conservación de energía (mallas) y la ley de Ohm.
      </p>

      <div className="glass-panel mb-4">
        <h2>1.1 Conceptos: nodo, rama y malla</h2>
        <ul>
          <li className="mb-2"><strong>Nodo:</strong> punto donde se conectan varias ramas. Todos los puntos unidos por un conductor ideal pertenecen al mismo potencial.</li>
          <li className="mb-2"><strong>Rama:</strong> elemento o conjunto de elementos conectados entre dos nodos. Una rama puede contener una fuente y varias resistencias en serie.</li>
          <li className="mb-2"><strong>Malla:</strong> camino cerrado que regresa al punto de partida sin "saltar" ningún elemento del circuito.</li>
        </ul>
      </div>

      <div className="glass-panel mb-4">
        <h2>1.2 Fórmulas fundamentales</h2>
        <MathBlock math="V = I \cdot R \quad \text{(Ley de Ohm)}" />
        <MathBlock math="\sum I_{\text{entrantes}} = \sum I_{\text{salientes}} \iff \sum I = 0 \quad \text{(KCL: Ley de nodos)}" />
        <MathBlock math="\sum \Delta V = 0 \quad \text{(KVL: Ley de mallas)}" />
        <div className="glass-panel-light" style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
          <p><strong>Nota importante:</strong> Un resultado de corriente negativo NO significa que la solución esté mal: significa que la corriente real circula en sentido contrario al que se supuso inicialmente.</p>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>1.3 Cómo recorrer una malla sin perderte con los signos</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Elemento</th>
              <th>Cómo lo atraviesas</th>
              <th>Cambio de potencial ΔV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fuente</td>
              <td>de <MathInline math="-" /> hacia <MathInline math="+" /></td>
              <td className="text-success"><MathInline math="+\epsilon" /> (subida de potencial)</td>
            </tr>
            <tr>
              <td>Fuente</td>
              <td>de <MathInline math="+" /> hacia <MathInline math="-" /></td>
              <td className="text-danger"><MathInline math="-\epsilon" /> (caída de potencial)</td>
            </tr>
            <tr>
              <td>Resistencia</td>
              <td>en el mismo sentido de la corriente</td>
              <td className="text-danger"><MathInline math="-IR" /></td>
            </tr>
            <tr>
              <td>Resistencia</td>
              <td>en sentido contrario a la corriente</td>
              <td className="text-success"><MathInline math="+IR" /></td>
            </tr>
          </tbody>
        </table>
        <p><strong>Procedimiento práctico:</strong> elige un sentido de recorrido (horario o antihorario), marca un punto de inicio y vuelve a ese mismo punto. No cambies de criterio a mitad de la malla. El sentido elegido es arbitrario; lo que importa es mantener los signos de forma coherente.</p>
      </div>

      <div className="glass-panel mb-4">
        <h2>1.4 Resistor compartido por dos mallas</h2>
        <p>Si asignas corrientes de malla <MathInline math="I_A" /> e <MathInline math="I_B" /> en sentido horario, normalmente atraviesan el resistor común en sentidos opuestos. En la ecuación de la malla A, la caída del resistor compartido es <MathInline math="R(I_A - I_B)" />. En la ecuación de la malla B es <MathInline math="R(I_B - I_A)" />.</p>
        <MathBlock math="V_R = R(I_A - I_B) \quad \text{(visto desde la malla A)}" />
      </div>

      <div className="glass-panel mb-4">
        <h2>1.5 Algoritmo seguro para examen</h2>
        <ol>
          <li className="mb-2">Identifica nodos y ramas. No confundas un cable continuo con varios nodos.</li>
          <li className="mb-2">Marca la polaridad de cada fuente: la placa larga es el terminal positivo cuando no aparecen signos +/-.</li>
          <li className="mb-2">Asigna una dirección a cada corriente desconocida o una corriente horaria por cada malla.</li>
          <li className="mb-2">Escribe primero KCL en los nodos donde se dividen o se reúnen corrientes.</li>
          <li className="mb-2">Recorre las mallas y escribe KVL usando la tabla de signos.</li>
          <li className="mb-2">Resuelve el sistema de ecuaciones.</li>
          <li className="mb-2">Interpreta signos negativos como cambio de sentido.</li>
          <li className="mb-2">Comprueba al menos un nodo y una malla.</li>
        </ol>
      </div>
    </motion.div>
  );
};

export default Theory;

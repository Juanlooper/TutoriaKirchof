import React from 'react';
import { motion } from 'framer-motion';
import CircuitDiagram from '../components/ui/CircuitDiagram';
import { MathBlock } from '../components/ui/MathText';

const Examples = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-fade-in">
      <h1 className="text-center mb-4">2. Problemas Ilustrativos</h1>
      
      <div className="glass-panel mb-4">
        <h2>Problema Ilustrativo 1</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Conceptos Clave y Resolución</h3>
            <ul>
              <li>KCL en el nodo derecho: las corrientes que llegan y salen deben equilibrarse.</li>
              <li>KVL en dos mallas independientes es suficiente.</li>
            </ul>
            <MathBlock math="\text{KCL: } I_1 + I_2 = I_3" />
            <MathBlock math="\text{Malla superior: } -4I_2 - 14 + 6I_1 - 10 = 0 \Rightarrow 6I_1 - 4I_2 = 24" />
            <MathBlock math="\text{Malla inferior: } +10 - 6I_1 - 2I_3 = 0 \Rightarrow 3I_1 + I_3 = 5" />
            <MathBlock math="I_1 = 2.00 \text{ A}, \quad I_2 = -3.00 \text{ A}, \quad I_3 = -1.00 \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 = 2.00 A (sentido dibujado, derecha)<br/>
              I2 = 3.00 A (opuesto a la flecha, real hacia la izquierda)<br/>
              I3 = −1.00 A (referencia de derecha a izquierda; sentido real hacia la derecha)
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="example1" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Problema Ilustrativo 2</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Conceptos Clave y Resolución</h3>
            <ul>
              <li>Tres ramas unen el mismo nodo superior con el inferior. Comparten potencial.</li>
              <li>Las resistencias en serie de una rama se suman.</li>
            </ul>
            <MathBlock math="\text{Rama izq: } V = 18 - 35.5 I_1" />
            <MathBlock math="\text{Rama central: } V = 6.25 I_3 - 3" />
            <MathBlock math="\text{Rama der: } V = 9.25 I_2 + 12" />
            <MathBlock math="\text{KCL: } I_1 = I_2 + I_3" />
            <MathBlock math="I_1 = 0.381 \text{ A}, \quad I_2 = -0.814 \text{ A}, \quad I_3 = 1.195 \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 = 0.381 A (hacia el nodo superior)<br/>
              I2 = −0.814 A (sentido real hacia el nodo superior)<br/>
              I3 = 1.195 A (hacia abajo)
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="example2" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Problema Ilustrativo 3</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <ul>
              <li>Fuentes ideales fijan diferencias de potencial exactas. Se usa supernodo.</li>
            </ul>
            <p>Referencia G = 0 V. El supernodo reúne T, M, R y BR.</p>
            <MathBlock math="V_M = V_T + 20" />
            <MathBlock math="V_R = V_M - 10 = V_T + 10" />
            <MathBlock math="V_{BR} = V_R + 5 = V_T + 15" />
            <MathBlock math="\frac{V_T}{20} + \frac{V_T+20}{10} + \frac{V_T+15}{5} = 0" />
            <MathBlock math="\text{KCL: } V_T = -\frac{100}{7} \text{ V}, \quad V_{BR} = \frac{5}{7} \text{ V}" />
            <MathBlock math="I = \frac{V_{BR} - 0}{5} = \frac{1}{7} \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I (batería 5 V) = 1/7 A ≈ 0.1429 A
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="example3" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Problema Ilustrativo 4</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <p>Tres mallas horarias: M1 superior izquierda, M2 inferior izquierda y M3 derecha.</p>
            <MathBlock math="\text{Malla } 1\text{: } 35M_1 - 8M_2 - 2M_3 = 25" />
            <MathBlock math="\text{Malla } 2\text{: } -8M_1 + 36M_2 - 8M_3 = -35" />
            <MathBlock math="\text{Malla } 3\text{: } -2M_1 - 8M_2 + 22M_3 = 10" />
            <MathBlock math="M_1 = 0.542 \text{ A}, \quad M_2 = -0.805 \text{ A}, \quad M_3 = 0.211 \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              M1 = 0.542 A (horario)<br/>
              M2 = 0.805 A (antihorario, negativa)<br/>
              M3 = 0.211 A (horario)
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="example4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Examples;

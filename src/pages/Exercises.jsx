import React from 'react';
import { motion } from 'framer-motion';
import CircuitDiagram from '../components/ui/CircuitDiagram';
import { MathBlock } from '../components/ui/MathText';

const Exercises = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="animate-fade-in">
      <h1 className="text-center mb-4">3. Asignación Práctica #14</h1>
      
      <div className="glass-panel mb-4">
        <h2>Práctica 1</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <MathBlock math="\text{KCL en } a\text{: } I_1 = I_2 + I_3" />
            <MathBlock math="\text{Rama izquierda: } V_{ab} = -6I_1 - 10" />
            <MathBlock math="\text{Rama central: } V_{ab} = 3I_2 - 6" />
            <MathBlock math="\text{Rama derecha: } V_{ab} = 6I_3 + 4" />
            <MathBlock math="I_1 = -\frac{11}{12} \text{ A}, \quad I_2 = \frac{1}{2} \text{ A}, \quad I_3 = -\frac{17}{12} \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 = −0.9167 A (referencia b → a; sentido real a → b)<br/>
              I2 = 0.5000 A (hacia abajo)<br/>
              I3 = 1.4167 A (real hacia arriba)
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice1" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 2</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <MathBlock math="\text{KCL: } I_1 + I_2 = I_3" />
            <MathBlock math="\text{Malla superior: } 6I_1 - 4I_2 = 24" />
            <MathBlock math="\text{Malla inferior: } 3I_1 + I_3 = 5" />
            <MathBlock math="I_1 = 2 \text{ A}, \quad I_2 = -3 \text{ A}, \quad I_3 = -1 \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 = 2.00 A hacia la derecha<br/>
              I2 = 3.00 A en sentido opuesto a la flecha<br/>
              I3 = −1.00 A; sentido real hacia la derecha por la rama inferior
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice2" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 3</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <p>Las tres ramas principales conectan el nodo superior c con el nodo inferior f. Definimos V = Vc - Vf. Con voltajes en V y resistencias en kΩ, las corrientes siguientes se obtienen en mA.</p>
            <MathBlock math="I_{R1} = \frac{V - 70}{2} \text{ mA}" />
            <MathBlock math="I_{R2} = \frac{V - 60}{3} \text{ mA}" />
            <MathBlock math="I_{R3} = \frac{V - 80}{4} \text{ mA}" />
            <MathBlock math="\text{KCL: } \frac{V-70}{2} + \frac{V-60}{3} + \frac{V-80}{4} = 0" />
            <MathBlock math="13V = 900 \Rightarrow V = 69.2308 \text{ V}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              R1: 0.3846 mA de f hacia c<br/>
              R2: 3.0769 mA hacia abajo<br/>
              R3: 2.6923 mA de f hacia c
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice3" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 4</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <p>V = V_superior - V_inferior.</p>
            <MathBlock math="I_{\text{izq}} = \frac{V}{8}" />
            <MathBlock math="I_{\text{cen}} = \frac{V-4}{6}" />
            <MathBlock math="I_{\text{der}} = \frac{V-12}{4}" />
            <MathBlock math="\text{KCL: } \frac{V}{8} + \frac{V-4}{6} + \frac{V-12}{4} = 0" />
            <MathBlock math="V = \frac{88}{13} = 6.7692 \text{ V}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              Rama Izq: 0.846 A hacia abajo<br/>
              Rama Cen: 0.462 A hacia abajo<br/>
              Rama Der: 1.308 A hacia arriba
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice4" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 5</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <p>M1 es la malla superior y M2 la inferior; ambas se suponen horarias.</p>
            <MathBlock math="\text{Malla } 1\text{: } 3M_1 + 4(M_1-M_2) = -20 \Rightarrow 7M_1 - 4M_2 = -20" />
            <MathBlock math="\text{Malla } 2\text{: } 4(M_2-M_1) + 4M_2 + 2M_2 = 8 \Rightarrow -4M_1 + 10M_2 = 8" />
            <MathBlock math="M_1 = -\frac{28}{9} \text{ A} \approx -3.111 \text{ A}, \quad M_2 = -\frac{4}{9} \text{ A} \approx -0.444 \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              M1: 3.111 A antihorario<br/>
              M2: 0.444 A antihorario<br/>
              Centro (M2-M1): 2.667 A a la derecha
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice5" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 6</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución (Método Nodal)</h3>
            <MathBlock math="\text{KCL en } B\text{: } \frac{100-B}{5} = \frac{B}{40} + \frac{B-C}{10}" />
            <MathBlock math="\text{KCL en } C\text{: } \frac{B-C}{10} + \frac{140-C}{20} = \frac{C-20}{15}" />
            <MathBlock math="B = 85.517 \text{ V}, \quad C = 77.931 \text{ V}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              i1=6.000 A, i2=2.897 A, i3=2.138 A<br/>
              i4=0.759 A, i5=3.862 A, i6=3.103 A
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice6" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 7</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución (Supernodo)</h3>
            <p>La rama central contiene la fuente de 12 V y el resistor de 4 Ω (I2). La rama derecha contiene 6 Ω (I3).</p>
            <MathBlock math="\text{KCL supernodo } B-C\text{: } \frac{B-6}{2} + \frac{B}{6} + \frac{C}{4} = 0" />
            <MathBlock math="\text{Restricción de la fuente: } B - C = 12" />
            <MathBlock math="B = \frac{72}{11} \text{ V}, \quad C = -\frac{60}{11} \text{ V}" />
            <MathBlock math="I_1 = \frac{6-B}{2} = -\frac{3}{11} \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 = -0.2727 A (sentido contrario)<br/>
              I2 = -1.3636 A (hacia arriba)<br/>
              I3 = +1.0909 A (hacia abajo)
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice7" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 8</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3>Teoría y Resolución</h3>
            <p>3 ramas en paralelo. Definimos V = V_superior - V_inferior.</p>
            <MathBlock math="\text{KCL: } \frac{V-2}{2} + \frac{V-1}{3} + \frac{V-4}{5} = 0" />
            <MathBlock math="15(V-2) + 10(V-1) + 6(V-4) = 0 \Rightarrow 31V = 64 \Rightarrow V = \frac{64}{31} \text{ V}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              I1 (centro) = 11/31 = 0.3548 A hacia abajo<br/>
              I2 (izq desc) = 1/31 = 0.0323 A hacia abajo<br/>
              I3 (der asc) = 12/31 = 0.3871 A hacia arriba
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice8" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 9</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3 className="text-accent">Teoría y Resolución (3 mallas)</h3>
            <p>Malla 1 (sup izq), Malla 2 (sup der), Malla 3 (inf). Todas en sentido horario.</p>
            <MathBlock math="\text{M}_1\text{: } 5M_1 - M_3 = -10" />
            <MathBlock math="\text{M}_2\text{: } 5M_2 - 2M_3 = 20" />
            <MathBlock math="\text{M}_3\text{: } -M_1 - 2M_2 + 7M_3 = 20" />
            <MathBlock math="M_1 = -\frac{17}{15} \text{ A}, \quad M_2 = \frac{86}{15} \text{ A}, \quad M_3 = \frac{13}{3} \text{ A}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              Rama 4Ω (sup izq): 1.133 A ←<br/>
              Rama 3Ω (sup der): 5.733 A →<br/>
              Rama 1Ω (cen izq): 5.467 A →<br/>
              Rama 2Ω (cen der): 1.400 A ←<br/>
              Rama 4Ω (inf izq): 4.333 A ↑
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice9" />
          </div>
        </div>
      </div>

      <div className="glass-panel mb-4">
        <h2>Práctica 10</h2>
        <div className="circuit-lesson-grid">
          <div>
            <h3 className="text-success">Teoría y Resolución (4 ramas)</h3>
            <p>KCL nodal con voltaje común V entre la barra superior e inferior.</p>
            <MathBlock math="\text{KCL: } \frac{V}{200} + \frac{V-40}{80} + \frac{V+360}{20} + \frac{V-80}{70} = 0" />
            <MathBlock math="V = -200 \text{ V}" />
            <div className="mt-4 p-4 glass-panel-light text-light">
              <strong>Resultado:</strong><br/>
              Rama 200Ω: 1 A hacia arriba<br/>
              Rama 40V/80Ω: 3 A hacia arriba<br/>
              Rama 360V/20Ω: 8 A hacia abajo<br/>
              Rama 80V/70Ω: 4 A hacia arriba
            </div>
          </div>
          <div>
            <CircuitDiagram circuitId="practice10" />
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default Exercises;

import { motion } from 'framer-motion';
import { MathBlock } from '../components/ui/MathText';

export default function Theory() {
  return <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
    <h1 className="text-center mb-4">1. Nodos y mallas paso a paso</h1>
    <p>En todos los ejercicios usaremos el mismo procedimiento: asignar corrientes a las ramas, aplicar la ley de nodos, recorrer cada malla y resolver por sustitución.</p>
    <section className="glass-panel mb-4">
      <h2>Nodo, rama y malla</h2>
      <p>Un nodo es una unión de conductores. Los puntos unidos por cable ideal tienen el mismo potencial. Una rama conecta dos nodos y lleva una misma corriente por sus elementos en serie. Una malla es un recorrido cerrado que vuelve al punto de partida; elegimos las ventanas del circuito para plantear ecuaciones independientes.</p>
      <p>Primero copia los valores, las conexiones y las polaridades del original. Si ya hay flechas de corriente, consérvalas. Si no hay, elige una por rama y mantenla durante toda la solución.</p>
    </section>
    <section className="glass-panel mb-4">
      <h2>Primero la ley de nodos</h2>
      <MathBlock math={String.raw`\sum I_{\text{entran}}=\sum I_{\text{salen}}`} />
      <p>Por ejemplo, si I1 entra e I2 e I3 salen:</p>
      <MathBlock math={String.raw`I_1=I_2+I_3`} />
      <p>Despeja una corriente. Esta será la expresión que sustituirás en las ecuaciones de las mallas.</p>
      <MathBlock math={String.raw`I_3=I_1-I_2`} />
      <p>Si todas las flechas supuestas salen de un nodo, su suma algebraica es cero. Al resolver, alguna corriente será negativa y en realidad entrará.</p>
    </section>
    <section className="glass-panel mb-4">
      <h2>Después la ley de mallas</h2>
      <MathBlock math={String.raw`\sum V_{\text{fuentes}}=\sum V_{\text{resistencias}}`} />
      <MathBlock math={String.raw`\sum \varepsilon=\sum RI`} />
      <p>Escribe el recorrido completo antes de la ecuación. Coloca las fuentes a la izquierda y los productos RI a la derecha, con estos signos:</p>
      <table className="styled-table">
        <thead><tr><th>Elemento</th><th>Cómo lo recorres</th><th>Término en la ecuación</th></tr></thead>
        <tbody>
          <tr><td>Fuente</td><td>De − a +</td><td>+V a la izquierda</td></tr>
          <tr><td>Fuente</td><td>De + a −</td><td>−V a la izquierda</td></tr>
          <tr><td>Resistencia</td><td>A favor de la corriente supuesta</td><td>+RI a la derecha</td></tr>
          <tr><td>Resistencia</td><td>En contra de la corriente supuesta</td><td>−RI a la derecha</td></tr>
        </tbody>
      </table>
      <p>El signo de RI corresponde al lado derecho de esta igualdad. La placa larga de una batería indica el terminal positivo. Incluye también las resistencias internas cuando aparezcan.</p>
    </section>
    <section className="glass-panel mb-4">
      <h2>Una resistencia compartida lleva una corriente de rama</h2>
      <p>Usa la misma corriente de esa resistencia en las dos mallas. Si una malla la recorre a favor de su flecha, escribe +RI; si la otra la recorre en contra, escribe −RI. Si la ley de nodos dio I3 = I1 − I2, sustituye esa relación después de plantear las mallas.</p>
      <MathBlock math={String.raw`RI_3=R(I_1-I_2)`} />
      <p>La resta sale de la ecuación del nodo; no hace falta introducir nuevas corrientes de malla.</p>
    </section>
    <section className="glass-panel mb-4">
      <h2>Resolver y comprobar</h2>
      <ol>
        <li>Escribe las relaciones de nodos y despeja las corrientes que vas a sustituir.</li>
        <li>Recorre cada malla y escribe suma de fuentes = suma de RI.</li>
        <li>Sustituye las relaciones de nodos y agrupa términos.</li>
        <li>Despeja una incógnita y sustitúyela en otra ecuación hasta obtener una sola corriente.</li>
        <li>Recupera las demás corrientes usando las mismas ecuaciones.</li>
        <li>Comprueba los nodos y las mallas con los resultados sin redondear.</li>
      </ol>
      <p>Un resultado negativo indica que la corriente real va contra la flecha supuesta. Conserva el signo en las comprobaciones. Usa V, Ω y A durante el cálculo; para pasar de A a mA multiplica por 1000.</p>
    </section>
  </motion.div>;
}

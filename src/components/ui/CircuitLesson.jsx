import CircuitDiagram from './CircuitDiagram';
import { MathBlock } from './MathText';
import { circuits } from '../../data/circuits';
import { lessons } from '../../data/lessons';
import { solveCircuit, formatCurrent } from '../../lib/circuitSolver';
import { evaluateLesson, equationMath, exactMath, nodeName } from '../../lib/lessonMath';

export default function CircuitLesson({ circuitId, title }) {
  const circuit = circuits[circuitId];
  const lesson = lessons[circuitId];
  const result = solveCircuit(circuit);
  const audit = evaluateLesson(lesson,result);
  return <section className="glass-panel mb-4 circuit-lesson" id={circuitId} aria-labelledby={`${circuitId}-heading`}>
    <h2 id={`${circuitId}-heading`}>{title}</h2>
    <div className="circuit-lesson-grid">
      <div>
        <h3>{lesson.method}</h3>
        <div className="solution-convention"><strong>Referencias y signos</strong><p>{lesson.convention}</p></div>
        <p className="solution-units">Los valores numéricos de las ecuaciones usan V, Ω y A, salvo que se indique mA. Se conserva toda la precisión al calcular y se redondea únicamente al presentar el resultado.</p>
        <ol className="solution-steps">{lesson.steps.map((step,i)=><li key={i}><p>{step.text}</p>{step.equations.map((math,j)=><MathBlock key={j} math={math} />)}</li>)}</ol>
        <h3>Sistema reducido</h3>
        {lesson.matrix.map((row,i)=><MathBlock key={i} math={equationMath(row,lesson.unknowns,lesson.rhs[i])} />)}
        <h3>Solución exacta</h3>
        {lesson.unknowns.map((unknown,i)=><MathBlock key={unknown.symbol} math={exactMath(unknown,audit.values[i])} />)}
        <div className="glass-panel-light solution-results">
          <strong>Corrientes: valor con signo y magnitud</strong>
          <ul>{circuit.branches.filter(b=>b.label).map(branch=>{
            const value=result.currents[branch.id];
            const from=nodeName(circuit,branch.from), to=nodeName(circuit,branch.to);
            const realDirection=value<0 ? `${to} → ${from}` : `${from} → ${to}`;
            return <li key={branch.id}><strong>{branch.label} = {formatCurrent(value,circuit.unit)}</strong><br/><span>Referencia: {from} → {to}. Magnitud: {formatCurrent(Math.abs(value),circuit.unit)}; sentido real: {realDirection}.</span></li>;
          })}</ul>
        </div>
        <p className="solution-conclusion">{lesson.conclusion}</p>
        <details className={`solution-check ${audit.valid ? '' : 'solution-check-error'}`}>
          <summary>{audit.valid ? '✓ Resolución comprobada contra el circuito' : 'Hay una discrepancia entre resolución y circuito'}</summary>
          <p>Se sustituyen las corrientes o potenciales del circuito en cada ecuación reducida, antes de redondear. Además se comparan con las fracciones exactas de la resolución.</p>
          <ul>{audit.substitutions.map((lhs,i)=><li key={i}>Ecuación {i+1}: lado izquierdo = {(Math.abs(lhs)<1e-9 ? 0 : lhs).toFixed(6)}; lado derecho = {lesson.rhs[i].toFixed(6)}.</li>)}</ul>
          <p>Diferencia máxima: {audit.maxResidual.toExponential(2)}. Los balances de nodos, tensiones y potencia están disponibles debajo del diagrama.</p>
        </details>
      </div>
      <div><CircuitDiagram circuitId={circuitId} /></div>
    </div>
  </section>;
}

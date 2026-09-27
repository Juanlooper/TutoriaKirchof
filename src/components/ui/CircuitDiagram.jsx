import { useId, useMemo, useState } from 'react';
import { circuits } from '../../data/circuits';
import { formatCurrent, solveCircuit, componentLabel } from '../../lib/circuitSolver';
import { CircuitElement, CurrentArrow } from './CircuitElements';
import './CircuitDiagram.css';
import { nodeName } from '../../lib/lessonMath';

export default function CircuitDiagram({ circuitId }) {
  const circuit = circuits[circuitId];
  const result = useMemo(() => solveCircuit(circuit), [circuit]);
  const uid = useId();
  const [animate, setAnimate] = useState(false);
  const [reference, setReference] = useState(false);
  const [showVoltages, setShowVoltages] = useState(false);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(100);
  const labeled = circuit.branches.filter(b => b.label);
  const active = circuit.branches.find(b => b.id === selected);
  const byId = new Map(circuit.nodes.map(n => [n.id, n]));
  const unit = circuit.unit || 'A';
  const checked = result.maxKcl < 1e-8 && result.maxKvl < 1e-8 && Math.abs(result.power) < 1e-7;

  return <figure className="circuit-panel" aria-labelledby={`${uid}-title`}>
    <figcaption id={`${uid}-title`} className="circuit-heading">{circuit.title}</figcaption>
    <div className="circuit-controls">
      <label><input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)} /> Animar corriente</label>
      <label><input type="checkbox" checked={showVoltages} onChange={e => setShowVoltages(e.target.checked)} /> Potenciales</label>
      <label>Flechas <select value={reference ? 'reference' : 'real'} onChange={e => setReference(e.target.value === 'reference')}><option value="real">Sentido real</option><option value="reference">Sentido supuesto</option></select></label>
      <label>Zoom <select value={zoom} onChange={e => setZoom(Number(e.target.value))}><option value={100}>100 %</option><option value={125}>125 %</option><option value={150}>150 %</option></select></label>
    </div>
    <div className="circuit-scroll" tabIndex={0} role="region" aria-label={`Diagrama desplazable: ${circuit.title}`}>
      <svg className="circuit-svg" style={{ width: `${zoom}%`, minWidth: 560 * zoom / 100 }} viewBox={`0 0 ${circuit.width} ${circuit.height}`} role="img" aria-labelledby={`${uid}-svg-title ${uid}-desc`}>
        <title id={`${uid}-svg-title`}>{circuit.title}</title>
        <desc id={`${uid}-desc`}>Las placas largas y el signo más indican el terminal positivo. {labeled.map(b => `${b.label}: ${formatCurrent(result.currents[b.id], unit)} respecto a ${nodeName(circuit,b.from)} hacia ${nodeName(circuit,b.to)}.`).join(' ')} Los valores y sentidos están disponibles en la tabla inferior.</desc>
        {circuit.branches.map(branch => {
          const start = byId.get(branch.from), end = byId.get(branch.to);
          const dx = end.x - start.x, dy = end.y - start.y;
          const length = Math.hypot(dx, dy), ux = dx / length, uy = dy / length;
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const centers = branch.components.map((_, i) => length * (i + 1) / (branch.components.length + 1));
          let cursor = 0;
          const segments = [];
          for (const center of centers) { segments.push([cursor, center - 32]); cursor = center + 32; }
          segments.push([cursor, length]);
          const path = segments.map(([a,b]) => `M ${start.x+ux*a} ${start.y+uy*a} L ${start.x+ux*b} ${start.y+uy*b}`).join(' ');
          const current = result.currents[branch.id];
          return <g key={branch.id} className={`circuit-branch ${selected === branch.id ? 'is-selected' : ''} ${selected && selected !== branch.id ? 'is-dimmed' : ''}`}>
            <path d={path} className="circuit-wire" />
            {animate && Math.abs(current) > 1e-10 && <path d={path} className="circuit-flow" style={{ animationDirection: current < 0 ? 'reverse' : 'normal' }} />}
            {branch.components.map((component, i) => <CircuitElement key={i} component={component} x={start.x+ux*centers[i]} y={start.y+uy*centers[i]} angle={angle} />)}
            {branch.label && Math.abs(current) > 1e-10 && <CurrentArrow x={(start.x+end.x)/2-uy*44} y={(start.y+end.y)/2+ux*44} angle={angle} reversed={!reference && current<0} label={branch.label} reference={reference} />}
          </g>;
        })}
        {circuit.nodes.map(node => <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="4.5" fill="var(--accent-color)" />
          {!/^[TB][023]$/.test(node.id) && <>
            <text x={node.x+12} y={node.y-14} className="circuit-node-label">{nodeName(circuit,node.id)}{node.id === circuit.ground ? ' · ref.' : ''}</text>
            {showVoltages && <text x={node.x+12} y={node.y+23} className="circuit-voltage">{result.voltages[node.id].toFixed(3)} V</text>}
          </>}
        </g>)}
      </svg>
    </div>
    <p className="circuit-legend">{reference ? 'Flechas discontinuas: referencias supuestas.' : 'Flechas verdes: sentido real.'} El signo de la tabla se refiere siempre al sentido supuesto. La animación indica dirección, no velocidad física.</p>
    <p className="circuit-mobile-hint">Desliza el circuito horizontalmente si no cabe en la pantalla.</p>
    <div className="circuit-table-scroll"><table className="circuit-results">
      <caption>Corrientes calculadas · selecciona una fila para resaltar su rama</caption>
      <thead><tr><th scope="col">Corriente</th><th scope="col">Referencia</th><th scope="col">Valor</th><th scope="col">Sentido real</th></tr></thead>
      <tbody>{labeled.map(branch => {
        const value = result.currents[branch.id];
        const from = nodeName(circuit,branch.from), to = nodeName(circuit,branch.to);
        return <tr key={branch.id} className={selected === branch.id ? 'selected-row' : ''}>
          <th scope="row"><button type="button" aria-pressed={selected === branch.id} onClick={() => setSelected(selected === branch.id ? null : branch.id)}>{branch.label}</button></th>
          <td>{from} → {to}</td><td className="current-value">{formatCurrent(value,unit)}</td><td>{Math.abs(value)<1e-10 ? 'Sin corriente' : value<0 ? `${to} → ${from}` : `${from} → ${to}`}</td>
        </tr>;
      })}</tbody>
    </table></div>
    <div className="circuit-selection" aria-live="polite">{active ? <><strong>{active.label}:</strong> {active.components.map(componentLabel).join(' + ')}. Diferencia de potencial de referencia: {(result.voltages[active.from]-result.voltages[active.to]).toFixed(4)} V.</> : 'Selecciona una corriente para identificar sus componentes y su diferencia de potencial.'}</div>
    <details className="circuit-verification"><summary>{checked ? '✓ Balance eléctrico comprobado' : 'Revisar balance eléctrico'}</summary><p>Se resuelven las conexiones y los valores de este diagrama. Error máximo de KCL: {result.maxKcl.toExponential(1)} A; de tensión de rama: {result.maxKvl.toExponential(1)} V. Balance de potencia: {Math.abs(result.power).toExponential(1)} W. Referencia: {nodeName(circuit,circuit.ground)} = 0 V.</p></details>
    <p className="circuit-source">Referencia: guía resuelta, página {circuit.page}.{circuit.note && ` ${circuit.note}`}</p>
  </figure>;
}

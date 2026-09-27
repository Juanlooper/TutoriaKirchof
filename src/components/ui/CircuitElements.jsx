import { componentLabel } from '../../lib/circuitSolver';

export function CircuitElement({ component, x, y, angle }) {
  const rad = angle * Math.PI / 180;
  const ux = Math.cos(rad), uy = Math.sin(rad), nx = -uy, ny = ux;
  const vertical = Math.abs(uy) > 0.7;
  const labelX = x - nx * (vertical ? 30 : 34);
  const labelY = y - ny * (vertical ? 30 : 34);
  const positiveAtStart = component.drop >= 0;
  return <g className="circuit-element">
    <g transform={`translate(${x} ${y}) rotate(${angle})`} stroke="currentColor" strokeWidth="2.5" fill="none">
      {component.type === 'resistor' ? <path d="M -32 0 H -23 L -18 -9 L -10 9 L -2 -9 L 6 9 L 14 -9 L 22 0 H 32" /> : <>
        <path d="M -32 0 H -8 M 8 0 H 32" />
        <path d={`M -8 ${positiveAtStart ? -20 : -11} V ${positiveAtStart ? 20 : 11} M 8 ${positiveAtStart ? -11 : -20} V ${positiveAtStart ? 11 : 20}`} strokeWidth="3" />
      </>}
    </g>
    {component.type === 'battery' && [-1, 1].map(side => <text key={side} x={x + side * ux * 23 + nx * 17} y={y + side * uy * 23 + ny * 17} textAnchor="middle" dominantBaseline="central" className="circuit-polarity">{(side === -1) === positiveAtStart ? '+' : '−'}</text>)}
    <text x={labelX} y={labelY} dominantBaseline="central" textAnchor={vertical ? (labelX > x ? 'start' : 'end') : 'middle'} className="circuit-component-label">{componentLabel(component)}</text>
  </g>;
}

export function CurrentArrow({ x, y, angle, reversed, label, reference }) {
  return <g className={reference ? 'current-reference' : 'current-real'}>
    <g transform={`translate(${x} ${y}) rotate(${angle + (reversed ? 180 : 0)})`}>
      <path d="M -20 0 H 20" stroke="currentColor" strokeWidth="2.5" strokeDasharray={reference ? '4 3' : undefined} />
      <path d="M 20 0 L 11 -5 L 11 5 Z" fill="currentColor" />
    </g>
    <text x={x - Math.sin(angle * Math.PI / 180) * 21} y={y + Math.cos(angle * Math.PI / 180) * 21} dominantBaseline="central" textAnchor="middle" className="circuit-current-label">{label}</text>
  </g>;
}

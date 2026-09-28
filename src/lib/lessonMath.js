export function readUnknown(result, unknown) {
  return unknown.kind === 'current' ? result.currents[unknown.id] : result.voltages[unknown.id];
}

export function evaluateLesson(lesson, result) {
  const values = lesson.unknowns.map(u => readUnknown(result,u));
  const substitutions = lesson.matrix.map(row => row.reduce((sum,coefficient,i)=>sum+coefficient*values[i],0));
  const maxResidual = Math.max(...substitutions.map((value,i)=>Math.abs(value-lesson.rhs[i])));
  const maxExactError = Math.max(...values.map((value,i)=>Math.abs(value-lesson.unknowns[i].exact[0]/lesson.unknowns[i].exact[1])));
  return { values, substitutions, maxResidual, maxExactError, valid: maxResidual < 1e-8 && maxExactError < 1e-8 };
}

export function equationMath(coefficients, unknowns, rhs) {
  let left = '';
  coefficients.forEach((coefficient,i)=>{
    if (coefficient === 0) return;
    const sign = coefficient < 0 ? '-' : left ? '+' : '';
    left += `${sign}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${unknowns[i].symbol}`;
  });
  return `${left || '0'}=${rhs}`;
}

export function exactMath(unknown, value) {
  const [numerator, denominator] = unknown.exact;
  const fraction = denominator === 1 ? `${numerator}` : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`;
  return `${unknown.symbol}=${fraction}\\ \\mathrm{${unknown.unit}}${denominator === 1 ? '' : `\\approx ${value.toFixed(4)}\\ \\mathrm{${unknown.unit}}`}`;
}

export function nodeName(circuit, id) {
  if (/^T\d$/.test(id)) return circuit.topLabel || 'S';
  if (/^B\d$/.test(id)) return circuit.bottomLabel || 'O';
  return id;
}

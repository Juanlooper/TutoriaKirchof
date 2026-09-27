/** DC branch analysis. SI units; source.drop = V(from) - V(to). */
export function solveCircuit(circuit) {
  const { nodes, branches, ground } = circuit;
  if (!nodes.some(n => n.id === ground)) throw new Error('Falta el nodo de referencia');
  const ids = nodes.map(n => n.id);
  if (new Set(ids).size !== ids.length) throw new Error('Nodos duplicados');
  const unknowns = ids.filter(id => id !== ground);
  const index = new Map(unknowns.map((id, i) => [id, i]));
  const count = unknowns.length;
  const size = count + branches.length;
  const matrix = Array.from({ length: size }, () => Array(size + 1).fill(0));
  branches.forEach((branch, j) => {
    if (!ids.includes(branch.from) || !ids.includes(branch.to)) throw new Error('Rama desconectada');
    const resistance = branch.components.reduce((s, c) => s + (c.type === 'resistor' ? c.value : 0), 0);
    const drop = branch.components.reduce((s, c) => s + (c.type === 'battery' ? c.drop : 0), 0);
    if (!Number.isFinite(resistance) || resistance < 0 || !Number.isFinite(drop)) throw new Error('Componente inválido');
    for (const [node, sign] of [[branch.from, 1], [branch.to, -1]]) {
      if (node === ground) continue;
      matrix[index.get(node)][count + j] += sign;
      matrix[count + j][index.get(node)] += sign;
    }
    matrix[count + j][count + j] = -resistance;
    matrix[count + j][size] = drop;
  });
  for (let col = 0; col < size; col++) {
    let pivot = col;
    for (let row = col + 1; row < size; row++) if (Math.abs(matrix[row][col]) > Math.abs(matrix[pivot][col])) pivot = row;
    if (Math.abs(matrix[pivot][col]) < 1e-12) throw new Error('Circuito singular: revisa conexiones y fuentes');
    [matrix[col], matrix[pivot]] = [matrix[pivot], matrix[col]];
    const divisor = matrix[col][col];
    for (let k = col; k <= size; k++) matrix[col][k] /= divisor;
    for (let row = 0; row < size; row++) {
      if (row === col) continue;
      const factor = matrix[row][col];
      for (let k = col; k <= size; k++) matrix[row][k] -= factor * matrix[col][k];
    }
  }
  const voltages = Object.fromEntries(ids.map(id => [id, id === ground ? 0 : matrix[index.get(id)][size]]));
  const currents = Object.fromEntries(branches.map((b, j) => [b.id, matrix[count + j][size]]));
  const kcl = Object.fromEntries(ids.map(id => [id, 0]));
  let maxKvl = 0;
  let power = 0;
  for (const b of branches) {
    const i = currents[b.id];
    const r = b.components.reduce((s, c) => s + (c.type === 'resistor' ? c.value : 0), 0);
    const e = b.components.reduce((s, c) => s + (c.type === 'battery' ? c.drop : 0), 0);
    kcl[b.from] += i;
    kcl[b.to] -= i;
    maxKvl = Math.max(maxKvl, Math.abs(voltages[b.from] - voltages[b.to] - r * i - e));
    power += r * i * i + e * i;
  }
  return { voltages, currents, maxKcl: Math.max(...Object.values(kcl).map(Math.abs)), maxKvl, power };
}

export function formatCurrent(value, unit = 'A') {
  const scaled = value * (unit === 'mA' ? 1000 : 1);
  return `${(Math.abs(scaled) < 0.00005 ? 0 : scaled).toFixed(4)} ${unit}`;
}

export function componentLabel(c) {
  if (c.type === 'battery') return `${c.value} V`;
  return c.value >= 1000 ? `${c.value / 1000} kΩ` : `${c.value} Ω`;
}

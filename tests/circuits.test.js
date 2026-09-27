import test from 'node:test';
import assert from 'node:assert/strict';
import { circuits } from '../src/data/circuits.js';
import { solveCircuit, formatCurrent } from '../src/lib/circuitSolver.js';

const near = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
for (const circuit of Object.values(circuits)) {
  test(`${circuit.id}: soluciones de la guía y balances eléctricos`, () => {
    const result = solveCircuit(circuit);
    near(result.maxKcl, 0);
    near(result.maxKvl, 0);
    near(result.power, 0, 1e-8);
    for (const b of circuit.branches) {
      if (b.expected !== undefined) near(result.currents[b.id], b.expected, circuit.unit === 'mA' ? 1e-8 : 0.00015);
    }
  });
}

test('Ejemplo 3: supernodo y corriente de la batería de 5 V', () => {
  const { voltages: v, currents: i } = solveCircuit(circuits.example3);
  near(v.T, -100/7); near(v.M, 40/7); near(v.R, -30/7); near(v.BR, 5/7);
  near(i.source5, 1/7); near(i.bottom, 1/7);
});
test('Práctica 6: nodos B y C, fuente de 40 V y rama de 10 Ω', () => {
  const { voltages: v, currents: i } = solveCircuit(circuits.practice6);
  near(v.A,100); near(v.E,20); near(v.B,2480/29); near(v.C,2260/29);
  near(i.middleRight,22/29); near(i.left,6);
});
test('Práctica 7: I2 en 4 Ω e I3 en 6 Ω', () => {
  const c = circuits.practice7;
  const { voltages: v, currents: i } = solveCircuit(c);
  near(v.B-v.C,12); near(i.center,-15/11); near(i.right,12/11);
  assert.equal(c.branches.find(b=>b.label==='I2').components[0].value,4);
  assert.equal(c.branches.find(b=>b.label==='I3').components[0].value,6);
});
test('Unidades: la práctica 3 conserva amperios internamente y presenta mA', () => {
  const i = solveCircuit(circuits.practice3).currents;
  assert.equal(formatCurrent(i.branch1,'mA'),'3.0769 mA');
  assert.equal(formatCurrent(i.branch0,'mA'),'-0.3846 mA');
  assert.equal(formatCurrent(-1e-12), '0.0000 A');
});
test('Se conservan las fuentes opuestas de 12 y 24 V del ejemplo 2', () => {
  const sources = circuits.example2.branches.flatMap(b=>b.components).filter(c=>c.type==='battery').map(c=>c.drop);
  assert.deepEqual(sources,[-18,-3,-12,24]);
});
test('La respuesta se recalcula al cambiar una resistencia', () => {
  const c = structuredClone(circuits.practice10);
  c.branches[0].components[0].value=100;
  const changed=solveCircuit(c), original=solveCircuit(circuits.practice10);
  assert.ok(Math.abs(changed.currents.branch0-original.currents.branch0)>0.5);
  near(changed.maxKcl,0); near(changed.power,0,1e-8);
});
test('Los nodos flotantes producen un error explícito', () => {
  const c = structuredClone(circuits.practice10);
  c.nodes.push({id:'floating',x:0,y:0});
  assert.throws(()=>solveCircuit(c),/singular/);
});
test('Orientación: invertir una rama y sus fuentes invierte solo su corriente de referencia', () => {
  const c = structuredClone(circuits.practice10);
  const b = c.branches[2];
  [b.from,b.to]=[b.to,b.from];
  b.components.reverse();
  b.components.forEach(c=>{if(c.type==='battery')c.drop=-c.drop;});
  const s=solveCircuit(c);
  near(s.currents.branch2,-8); near(s.voltages.T1,-200);
});

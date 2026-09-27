import test from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { circuits } from '../src/data/circuits.js';
import { lessons } from '../src/data/lessons.js';
import { solveCircuit } from '../src/lib/circuitSolver.js';
import { evaluateLesson, equationMath, exactMath } from '../src/lib/lessonMath.js';

for (const [id,lesson] of Object.entries(lessons)) {
  test(`${id}: el sistema escrito y sus fracciones coinciden con el circuito`,()=>{
    const audit=evaluateLesson(lesson,solveCircuit(circuits[id]));
    assert.ok(audit.valid, `${id}: residual ${audit.maxResidual}, error exacto ${audit.maxExactError}`);
    assert.equal(lesson.matrix.length,lesson.unknowns.length);
    assert.equal(lesson.rhs.length,lesson.unknowns.length);
  });
  test(`${id}: todas las fórmulas de la resolución son LaTeX válido`,()=>{
    const formulas=lesson.steps.flatMap(s=>s.equations);
    formulas.push(...lesson.matrix.map((row,i)=>equationMath(row,lesson.unknowns,lesson.rhs[i])));
    formulas.push(...lesson.unknowns.map(u=>exactMath(u,u.exact[0]/u.exact[1])));
    for(const formula of formulas) assert.doesNotThrow(()=>katex.renderToString(formula,{throwOnError:true}),formula);
  });
}

test('La comprobación detecta un signo incorrecto en la resolución aunque el circuito sea válido',()=>{
  const lesson=structuredClone(lessons.practice1);
  lesson.unknowns[2].exact[0]=17;
  assert.equal(evaluateLesson(lesson,solveCircuit(circuits.practice1)).valid,false);
});
test('La comprobación detecta una fuente omitida en la ecuación escrita',()=>{
  const lesson=structuredClone(lessons.practice6);
  lesson.rhs[1]=380;
  assert.equal(evaluateLesson(lesson,solveCircuit(circuits.practice6)).valid,false);
});
test('Cada circuito tiene una resolución revisada',()=>{
  assert.deepEqual(Object.keys(lessons).sort(),Object.keys(circuits).sort());
});

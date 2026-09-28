import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { circuits } from '../src/data/circuits.js';
import { lessons } from '../src/data/lessons.js';
import { solveCircuit } from '../src/lib/circuitSolver.js';

// Evaluador aritmético limitado a las fórmulas didácticas. No ejecuta código.
// Comprueba cada igualdad intermedia, no solo las respuestas finales.
function arithmetic(latex, values) {
  let text=latex.replace(/\\mathrm(?:\{[^}]*\}|\s*[A-Za-z]+)/g,'').replace(/\\ /g,'').replace(/\s/g,'');
  text=text.replace(/(?:[IiV]_(?:\{[^}]+\}|[a-z0-9])|\\alpha|\\beta)/g, symbol=>{
    assert.ok(symbol in values,`Variable desconocida: ${symbol}`);
    return `(${values[symbol]})`;
  });
  let p=0;
  const atom=()=>{
    if(text.startsWith('\\frac',p)) {
      p+=5;
      const argument=()=>{
        if(text[p]==='{') {p++;const v=sum();assert.equal(text[p++],'}');return v;}
        assert.match(text[p],/\d/);return Number(text[p++]);
      };
      const a=argument(),b=argument();return a/b;
    }
    if(text[p]==='(') {p++;const v=sum();assert.equal(text[p++],')');return v;}
    const n=text.slice(p).match(/^\d+(?:\.\d+)?/);
    assert.ok(n,`Expresión no reconocida: ${text.slice(p)}`);p+=n[0].length;return Number(n[0]);
  };
  const product=()=>{
    let sign=1;
    while(text[p]==='+'||text[p]==='-') {if(text[p++]==='-')sign*=-1;}
    let v=sign*atom();
    while(p<text.length&&!'+-)}'.includes(text[p])) v*=atom();
    return v;
  };
  const sum=()=>{
    let v=product();
    while(text[p]==='+'||text[p]==='-') {const sign=text[p++]==='+'?1:-1;v+=sign*product();}
    return v;
  };
  const result=sum();assert.equal(p,text.length, text);return result;
}

for(const [id,lesson] of Object.entries(lessons)) {
  test(`${id}: todas las igualdades de los pasos son correctas`,()=>{
    const result=solveCircuit(circuits[id]);
    const values={};
    for(const b of circuits[id].branches.filter(b=>b.label)) {
      const initial=b.label[0],sub=b.label.slice(1).replace('Ω','\\Omega');
      values[`${initial}_{${sub}}`]=result.currents[b.id];
      if(sub.length===1) values[`${initial}_${sub}`]=result.currents[b.id];
    }
    values['V_c']=result.voltages.T1;
    values['V_f']=result.voltages.B1;
    values['\\alpha']=1;values['\\beta']=7;
    values['I_{20V\\,central}']=result.currents.center;
    for(const formula of lesson.steps.flatMap(s=>s.equations)) {
      // La única aproximación es Vc−Vf redondeada a cuatro decimales.
      const approximate=formula.includes('\\approx');
      const expressions=formula.split(/=|\\approx/);
      if(expressions.length<2)continue;
      const scaled={...values};
      if(formula.includes('\\mathrm{mA}')) for(const key of Object.keys(scaled)) if(key.startsWith('I'))scaled[key]*=1000;
      const numbers=expressions.map(e=>arithmetic(e,scaled));
      for(const n of numbers.slice(1)) assert.ok(Math.abs(n-numbers[0])<(approximate?0.000051:1e-7),`${formula}: ${numbers}`);
    }
  });
  test(`${id}: figura disponible y desarrollo con nodo antes de mallas`,()=>{
    assert.ok(existsSync(new URL(`../public${lesson.image}`,import.meta.url)));
    assert.match(lesson.steps[0].text,/Nodo/);
    const loops=lesson.steps.filter(s=>/^Malla|^Primera malla|^Segunda malla|^Tercera malla/.test(s.text));
    assert.ok(loops.length>=2);
    for(const loop of loops) {
      assert.ok(loop.text.includes('→'));
      const [sources,resistors]=loop.equations[0].split('=');
      assert.doesNotMatch(sources,/[Ii]_/);
      assert.match(resistors,/[Ii]_/);
    }
  });
}

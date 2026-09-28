// Circuitos contrastados con las figuras del DOCX original del usuario.
// Values are SI. A positive source drop places + at the branch's from end.
const R = value => ({ type: 'resistor', value });
const V = drop => ({ type: 'battery', value: Math.abs(drop), drop });
const N = (id, x, y) => ({ id, x, y });
const B = (id, from, to, components = [], label, expected) => ({ id, from, to, components, label, expected });
const circuit = (id, title, page, nodes, branches, ground, extra = {}) => ({ id, title, page, nodes, branches, ground, width: 800, height: 640, ...extra });

function parallel(id, title, page, specifications, extra = {}) {
  const xs = specifications.length === 4 ? [100, 300, 500, 700] : [120, 400, 680];
  const nodes = xs.flatMap((x, i) => [N(`T${i}`, x, 90), N(`B${i}`, x, 550)]);
  const branches = specifications.map((s, i) => B(`branch${i}`, s.up ? `B${i}` : `T${i}`, s.up ? `T${i}` : `B${i}`, s.components, s.label, s.expected));
  xs.slice(1).forEach((_, i) => branches.push(B(`top${i}`, `T${i}`, `T${i+1}`), B(`bottom${i}`, `B${i}`, `B${i+1}`)));
  return circuit(id, title, page, nodes, branches, 'B1', { note: 'Ramas redibujadas entre dos barras comunes. Se conservan todos los componentes, conexiones y polaridades; el orden de elementos en serie no cambia su corriente.', ...extra });
}

const example1 = circuit('example1', 'Ejemplo 1 · Dos mallas', 3,
  [N('e',120,90),N('f',680,90),N('b',120,320),N('c',680,320),N('a',120,550),N('d',680,550)],
  [B('upperR','b','e',[R(4)],'I2',-3),B('upperV','e','f',[V(14)]),B('rightTop','f','c'),B('middle','b','c',[V(-10),R(6)],'I1',2),B('rightBottom','c','d'),B('lower','d','a',[R(2)],'I3',-1),B('leftBottom','a','b')], 'a');

const example2 = parallel('example2','Ejemplo 2 · Fuentes y resistencias en serie',4,[
  {components:[R(15),V(-18),R(0.5),R(20)],up:true,label:'I1',expected:0.3811},
  {components:[R(6),V(-3),R(0.25)],label:'I3',expected:1.1952},
  {components:[R(8),V(-12),R(0.5),R(0.75),V(24)],label:'I2',expected:-0.8141},
], {note:'Se muestran también las resistencias internas y la fuente de 24 V del original. En la rama derecha las fuentes se oponen: 24 − 12 = 12 V; su resistencia total es 9.25 Ω.'});

const example3 = circuit('example3','Ejemplo 3 · Nodos y mallas',5,
  [N('TL',120,90),N('T',400,90),N('TR',680,90),N('M',400,320),N('R',680,320),N('BL',120,550),N('G',400,550),N('BR',680,550)],
  [B('topWire','TL','T'),B('left','TL','BL',[R(20)],'I20'),B('groundWire','BL','G'),B('source20','T','M',[V(-20)]),B('middle','M','G',[R(10)],'I10'),B('top','T','TR',[R(2)],'I2Ω'),B('rightR','TR','R',[R(3)]),B('source10','M','R',[V(10)]),B('source5','R','BR',[V(-5)],'I5V',1/7),B('bottom','BR','G',[R(5)],'I5Ω',1/7)],'G',
  {note:'La corriente de la fuente de 5 V baja de R a BR y vuelve por la resistencia de 5 Ω hacia G.'});

const example4 = circuit('example4','Ejemplo 4 · Tres mallas',6,
  [N('TL',120,90),N('T',400,90),N('TR',680,90),N('L',120,320),N('M',400,320),N('BL',120,550),N('G',400,550),N('BR',680,550)],
  [B('topLeft','TL','T',[R(20)],'I1',0.5424),B('topRight','T','TR',[R(7)],'I3',0.2112),B('leftTop','TL','L',[V(20),R(5)]),B('leftBottom','L','BL',[V(-30),R(10)]),B('sharedHorizontal','L','M',[R(8),V(5)],'I8h',-1.3471),B('centerTop','T','M',[R(2)],'I2Ω',0.3312),B('centerBottom','M','G',[R(8)],'I8v',-1.0159),B('bottomLeft','G','BL',[R(10)],'I2',-0.8047),B('bottomRight','BR','G',[R(5)]),B('right','TR','BR',[V(-10)])],'G',
  {note:'I1, I2 e I3 son corrientes de ramas exteriores. Las corrientes centrales se obtienen aplicando la ley de nodos.'});

const practice1 = parallel('practice1','Práctica 1 · Tres ramas',8,[
  {components:[R(4),V(10),R(2)],up:true,label:'I1',expected:-11/12},
  {components:[V(-6),R(3)],label:'I2',expected:1/2},
  {components:[R(4),V(4),R(2)],label:'I3',expected:-17/12},
],{topLabel:'a',bottomLabel:'b'});

const practice2 = {...example1,id:'practice2',title:'Práctica 2 · Dos mallas',page:9};
const practice3 = parallel('practice3','Práctica 3 · Corrientes en mA',10,[
  {components:[V(70),R(2000)],label:'IR1',expected:-1/2600},
  {components:[V(60),R(3000)],label:'IR2',expected:1/325},
  {components:[R(4000),V(80)],label:'IR3',expected:-7/2600},
],{unit:'mA',topLabel:'c',bottomLabel:'f'});
const practice4 = parallel('practice4','Práctica 4 · Resistencias en serie',11,[
  {components:[R(8)],label:'Iizq',expected:11/13},
  {components:[R(5),R(1),V(4)],label:'Icen',expected:6/13},
  {components:[R(3),R(1),V(12)],label:'Ider',expected:-17/13},
]);
const practice5 = circuit('practice5','Práctica 5 · Mallas superior e inferior',12,
  [N('TL',120,90),N('TR',680,90),N('L',120,320),N('R',680,320),N('BL',120,550),N('BR',680,550)],
  [B('top','TL','TR',[R(3)],'I1',-28/9),B('leftTop','TL','L',[V(-20)]),B('rightTop','TR','R'),B('middle','L','R',[R(4)],'Icentro',8/3),B('leftBottom','BL','L',[R(2)],'I2',-4/9),B('rightBottom','R','BR',[R(4)]),B('bottom','BL','BR',[V(8)])],'BL');

const practice6 = circuit('practice6','Práctica 6 · Nodos y tres mallas',13,
  [N('TL',120,90),N('TR',680,90),N('A',120,320),N('B',400,320),N('C',680,320),N('BL',120,550),N('D',400,550),N('E',680,550)],
  [B('leftTop','A','TL'),B('top','TL','TR',[R(20),V(-40)],'i6',90/29),B('rightTop','TR','C'),B('left','BL','A',[V(-100)],'i1',6),B('middleLeft','A','B',[R(5)],'i2',84/29),B('middleRight','B','C',[R(10)],'i4',22/29),B('middle','B','D',[R(40)],'i3',62/29),B('right','C','E',[R(15)],'i5',112/29),B('bottomLeft','BL','D'),B('bottom','D','E',[V(-20)])],'D');

const practice7 = circuit('practice7','Práctica 7 · Nodos y dos mallas',15,
  [N('A',120,90),N('B',400,90),N('TR',680,90),N('C',400,320),N('BL',120,550),N('G',400,550),N('BR',680,550)],
  [B('left','BL','A',[V(-6)]),B('top','A','B',[R(2)],'I1',-3/11),B('source','B','C',[V(12)]),B('center','C','G',[R(4)],'I2',-15/11),B('topRight','B','TR'),B('right','TR','BR',[R(6)],'I3',12/11),B('bottomLeft','BL','G'),B('bottomRight','G','BR')],'G');

const practice8 = parallel('practice8','Práctica 8 · Tres fuentes',16,[
  {components:[R(2),V(2)],label:'I2',expected:1/31},
  {components:[V(1),R(3)],label:'I1',expected:11/31},
  {components:[V(-4),R(5)],up:true,label:'I3',expected:12/31},
]);

const practice9 = circuit('practice9','Práctica 9 · Tres mallas',17,
  [N('TL',120,90),N('T',400,90),N('TR',680,90),N('L',120,320),N('M',400,320),N('R',680,320),N('BL',120,550),N('BR',680,550)],
  [B('topLeft','TL','T',[R(4)],'I1',-17/15),B('topRight','T','TR',[R(3)],'I2',86/15),B('leftTop','TL','L',[V(10)]),B('center','T','M',[V(20)]),B('middleLeft','L','M',[R(1)],'I1Ω',82/15),B('middleRight','M','R',[R(2)],'I2Ω',-7/5),B('rightTop','TR','R'),B('rightBottom','R','BR'),B('leftBottom','BL','L',[R(4)],'I3',13/3),B('bottom','BL','BR',[V(20)])],'BL');

const practice10 = parallel('practice10','Práctica 10 · Cuatro ramas',18,[
  {components:[R(200)],label:'I200',expected:-1},
  {components:[V(40),R(80)],label:'I40',expected:-3},
  {components:[V(-360),R(20)],label:'I360',expected:8},
  {components:[V(80),R(70)],label:'I80',expected:-4},
]);

export const circuits = Object.fromEntries([example1,example2,example3,example4,practice1,practice2,practice3,practice4,practice5,practice6,practice7,practice8,practice9,practice10].map(c => [c.id,c]));

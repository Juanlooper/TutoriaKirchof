// Reduced equations independently transcribed from KCL/KVL, not generated
// by the circuit solver. Exact fractions are independently checked in tests.
const current = (symbol, id, numerator, denominator = 1) => ({ symbol, kind: 'current', id, exact: [numerator, denominator], unit: 'A' });
const voltage = (symbol, id, numerator, denominator = 1) => ({ symbol, kind: 'voltage', id, exact: [numerator, denominator], unit: 'V' });
const step = (text, ...equations) => ({ text, equations });
const raw = String.raw;

const example1 = {
  method: 'Ley de nodos y dos mallas',
  convention: 'I1 se supone de b a c por la rama central. I2 sube de b a e y recorre la rama superior hacia c. I3 baja de c a d y vuelve de d a a por la resistencia inferior. Un signo negativo invierte esa referencia; no se elimina del resultado.',
  steps: [
    step('En c, I1 e I2 entran e I3 sale. La malla superior se recorre b → e → f → c → b; la inferior, b → c → d → a → b.', raw`I_1+I_2-I_3=0`, raw`-4I_2-14+6I_1-10=0`, raw`10-6I_1-2I_3=0`),
    step('De la malla inferior: I3 = 5 − 3I1. Al sustituir en KCL: I2 = 5 − 4I1. La malla superior queda:', raw`6I_1-4(5-4I_1)=24`, raw`22I_1=44`),
  ],
  unknowns: [current('I_1','middle',2),current('I_2','upperR',-3),current('I_3','lower',-1)],
  matrix: [[1,1,-1],[6,-4,0],[3,0,1]], rhs: [0,24,5],
  conclusion: 'I2 = −3 A significa una magnitud de 3 A que baja de e a b por 4 Ω. I3 = −1 A significa una magnitud de 1 A de a a d por 2 Ω, hacia la derecha. Las flechas del modo «Sentido real» ya incluyen esta inversión.',
};
const example2 = {
  method: 'Voltaje común entre dos nodos',
  convention: 'U = V(S) − V(0). I1 se supone ascendente en la rama izquierda; I2 e I3, descendentes en las ramas derecha y central. Las resistencias internas también cuentan.',
  steps: [
    step('Se suman solo los resistores que están en serie dentro de cada rama.', raw`R_{izq}=20+0.5+15=35.5\ \Omega`, raw`R_{cen}=6+0.25=6.25\ \Omega`, raw`R_{der}=8+0.5+0.75=9.25\ \Omega`),
    step('Las fuentes derechas se oponen: la de 12 V es una subida al bajar y la de 24 V una caída. La caída neta es 24 − 12 = 12 V.', raw`U=18-35.5I_1`, raw`U=6.25I_3-3`, raw`U=9.25I_2+12`),
    step('KCL: I1 = I2 + I3. Igualamos las tres expresiones de U y eliminamos I2 = I1 − I3.', raw`35.5I_1+6.25I_3=21`, raw`-9.25I_1+15.5I_3=15`),
  ],
  unknowns: [current('I_1','branch0',412,1081),current('I_2','branch2',-880,1081),current('I_3','branch1',1292,1081)],
  matrix: [[1,-1,-1],[35.5,0,6.25],[0,-9.25,6.25]], rhs: [0,21,15],
  conclusion: 'Las ramas izquierda y derecha aportan corriente hacia S; la central la devuelve al nodo 0. I2 conserva el signo negativo respecto a su referencia descendente.',
};
const example3 = {
  method: 'Supernodo de fuentes ideales',
  convention: 'G = 0 V. La fuente de 20 V es positiva hacia M; la de 10 V, hacia M; la de 5 V, hacia BR. La corriente buscada por la batería de 5 V se toma de R a BR.',
  steps: [
    step('Las fuentes relacionan los potenciales:', raw`V_M=V_T+20`,raw`V_R=V_M-10=V_T+10`,raw`V_{BR}=V_R+5=V_T+15`),
    step('El supernodo tiene tres conexiones resistivas hacia G: 20 Ω, 10 Ω y 5 Ω. La cadena de 2 Ω y 3 Ω conecta dos nodos internos del supernodo y no aparece en su KCL externa; sí conduce corriente.',raw`\frac{V_T}{20}+\frac{V_T+20}{10}+\frac{V_T+15}{5}=0`),
    step('Multiplicando por 20:',raw`V_T+2(V_T+20)+4(V_T+15)=0`,raw`7V_T=-100`),
    step('El nodo BR solo conecta la batería y el resistor de 5 Ω. Por continuidad, sus corrientes tienen igual magnitud.',raw`V_{BR}=\frac{5}{7}\ \mathrm{V}`,raw`I_{5V}=I_{5\Omega}=\frac{V_{BR}}{5}=\frac{1}{7}\ \mathrm{A}`),
  ],
  unknowns: [voltage('V_T','T',-100,7)], matrix: [[7]], rhs: [-100],
  conclusion: 'La corriente de 5 V baja de R a BR y vuelve por 5 Ω hacia G: 0.1429 A. Si se pide α + β para I = α/β, la fracción irreducible es 1/7 y la respuesta es 8.',
};
const example4 = {
  method: 'Tres corrientes de malla',
  convention: 'M1: ventana superior izquierda; M2: inferior izquierda; M3: derecha. Todas se suponen horarias. Las flechas con nombre M se dibujan sobre un resistor exclusivo de su malla.',
  steps: [
    step('En un resistor compartido se utiliza la diferencia entre corrientes de malla. En la malla 1 las fuentes aportan +20 +5 V.',raw`(20+5)M_1+8(M_1-M_2)+2(M_1-M_3)=25`),
    step('En la malla 2 las fuentes aportan −30 −5 V; hay dos resistores exclusivos de 10 Ω.',raw`(10+10)M_2+8(M_2-M_1)+8(M_2-M_3)=-35`),
    step('En la malla derecha la fuente de 10 V se atraviesa de − a +.',raw`(7+5)M_3+2(M_3-M_1)+8(M_3-M_2)=10`),
    step('Las corrientes compartidas se obtienen después de resolver el sistema: L → M, T → M y M → G, respectivamente.',raw`I_{8h}=M_2-M_1`,raw`I_2=M_1-M_3`,raw`I_{8v}=M_2-M_3`),
  ],
  unknowns: [current('M_1','topLeft',1605,2959),current('M_2','bottomLeft',-9525,11836),current('M_3','topRight',625,2959)],
  matrix: [[35,-8,-2],[-8,36,-8],[-2,-8,22]],rhs:[25,-35,10],
  conclusion: 'M2 es negativa: −0.8047 A respecto al sentido horario, es decir, una magnitud de 0.8047 A antihoraria. M1 y M3 son horarias. No se debe escribir M2 = +0.8047 A manteniendo la referencia horaria.',
};
const practice1 = {
  method: 'Tres ramas entre a y b',
  convention: 'U = Va − Vb. I1 se supone de b a a por la izquierda; I2 e I3, de a a b por el centro y la derecha. La fuente izquierda es positiva hacia b, la central hacia b y la derecha hacia a.',
  steps: [
    step('En a: I1 entra e I2 e I3 salen. Las resistencias de las ramas son 6, 3 y 6 Ω.',raw`I_1=I_2+I_3`,raw`U=-6I_1-10`,raw`U=3I_2-6`,raw`U=6I_3+4`),
    step('Igualando las expresiones de U:',raw`-6I_1-3I_2=4`,raw`3I_2-6I_3=10`),
    step('Con I1 = I2 + I3, la primera ecuación se convierte en −9I2 −6I3 = 4. Restarla de la segunda da 12I2 = 6.',raw`I_2=\frac12`,raw`I_3=-\frac{17}{12}`,raw`I_1=-\frac{11}{12}`),
  ],
  unknowns:[current('I_1','branch0',-11,12),current('I_2','branch1',1,2),current('I_3','branch2',-17,12)],
  matrix:[[1,-1,-1],[-6,-3,0],[0,3,-6]],rhs:[0,4,10],
  conclusion:'U = −4.5 V en las tres ramas. I1 e I3 tienen signo negativo. I3 = −1.4167 A respecto a a → b significa una magnitud de 1.4167 A de b hacia a, hacia arriba.',
};
const practice3 = {
  method:'Análisis nodal y conversión a miliamperios',
  convention:'U = Vc − Vf, con f = 0 V. Las tres corrientes se suponen de c a f. En las ecuaciones se usan resistencias en Ω y corrientes en A; la tabla convierte A a mA multiplicando por 1000.',
  steps:[
    step('Las tres fuentes tienen su terminal positivo hacia c.',raw`I_{R1}=\frac{U-70}{2000}`,raw`I_{R2}=\frac{U-60}{3000}`,raw`I_{R3}=\frac{U-80}{4000}`),
    step('KCL en c: la suma algebraica de las corrientes descendentes es cero.',raw`\frac{U-70}{2000}+\frac{U-60}{3000}+\frac{U-80}{4000}=0`),
    step('Multiplicando por 12000 y agrupando:',raw`6(U-70)+4(U-60)+3(U-80)=0`,raw`13U=900`),
    step('Se sustituye el potencial sin redondear. Estos resultados ya están expresados en mA.',raw`I_{R1}=-\frac5{13}\ \mathrm{mA}`,raw`I_{R2}=\frac{40}{13}\ \mathrm{mA}`,raw`I_{R3}=-\frac{35}{13}\ \mathrm{mA}`),
  ],
  unknowns:[voltage('U','T1',900,13)],matrix:[[13]],rhs:[900],
  conclusion:'R1 y R3 conducen de f hacia c; R2 conduce de c hacia f. Los signos de IR1 e IR3 siguen siendo negativos respecto a las referencias descendentes. −5/13 +40/13 −35/13 = 0 mA.',
};
const practice4 = {
  method:'Voltaje común y resistencias equivalentes',
  convention:'U = V(S) − V(0). Las tres referencias son descendentes. Las resistencias centrales suman 5 + 1 = 6 Ω y las derechas 3 + 1 = 4 Ω.',
  steps:[
    step('Las fuentes de 4 y 12 V producen caídas al descender.',raw`I_{izq}=\frac U8`,raw`I_{cen}=\frac{U-4}{6}`,raw`I_{der}=\frac{U-12}{4}`),
    step('KCL, multiplicada por 24:',raw`\frac U8+\frac{U-4}{6}+\frac{U-12}{4}=0`,raw`3U+4(U-4)+6(U-12)=0`,raw`13U=88`),
    step('Sustituyendo U = 88/13:',raw`I_{izq}=\frac{11}{13}\ \mathrm A`,raw`I_{cen}=\frac6{13}\ \mathrm A`,raw`I_{der}=-\frac{17}{13}\ \mathrm A`),
  ],
  unknowns:[voltage('U','T1',88,13)],matrix:[[13]],rhs:[88],
  conclusion:'La corriente derecha es negativa respecto a la referencia descendente: circulan 1.3077 A hacia arriba. Las otras dos corrientes bajan. KCL: 11/13 +6/13 −17/13 = 0 A.',
};
const practice5 = {
  method:'Dos mallas y un resistor compartido',
  convention:'M1 es la malla superior y M2 la inferior; ambas horarias. La corriente central L → R es M2 − M1. La fuente de 20 V es positiva abajo y la de 8 V a la izquierda.',
  steps:[
    step('La malla superior cruza la fuente de 20 V de + a −.',raw`3M_1+4(M_1-M_2)=-20`),
    step('La malla inferior cruza la fuente de 8 V de − a +.',raw`4(M_2-M_1)+(4+2)M_2=8`),
    step('Multiplicamos la primera ecuación reducida por 10 y la segunda por 4 para eliminar M2.',raw`70M_1-40M_2=-200`,raw`-16M_1+40M_2=32`,raw`54M_1=-168`),
    step('La corriente compartida es una corriente de rama, no otra corriente de malla.',raw`I_{centro}=M_2-M_1=\frac83\ \mathrm A`),
  ],
  unknowns:[current('M_1','top',-28,9),current('M_2','leftBottom',-4,9)],matrix:[[7,-4],[-4,10]],rhs:[-20,8],
  conclusion:'Ambas mallas resultan antihorarias, con valores de referencia negativos. La corriente central es +2.6667 A de L a R. Por el resistor inferior izquierdo circulan 0.4444 A hacia abajo.',
};
const practice6 = {
  method:'Potenciales nodales B y C',
  convention:'D = 0 V; la fuente izquierda fija A = 100 V y la inferior E = 20 V. Las seis corrientes se refieren a las flechas indicadas. La fuente superior de 40 V aporta una subida al recorrer A → C.',
  steps:[
    step('KCL en B y expresión de la rama superior:',raw`\frac{100-V_B}{5}=\frac{V_B}{40}+\frac{V_B-V_C}{10}`,raw`i_6=\frac{100+40-V_C}{20}`),
    step('KCL en C:',raw`\frac{V_B-V_C}{10}+\frac{140-V_C}{20}=\frac{V_C-20}{15}`),
    step('Multiplicamos la ecuación de B por 40 y la de C por 60. Se obtienen 13VB −4VC = 800 y −6VB +13VC = 500.'),
    step('Con los potenciales exactos, aplicamos Ohm a cada rama:',raw`i_2=\frac{100-V_B}{5}=\frac{84}{29}\ \mathrm A`,raw`i_3=\frac{V_B}{40}=\frac{62}{29}\ \mathrm A`,raw`i_4=\frac{V_B-V_C}{10}=\frac{22}{29}\ \mathrm A`,raw`i_5=\frac{V_C-20}{15}=\frac{112}{29}\ \mathrm A`,raw`i_6=\frac{140-V_C}{20}=\frac{90}{29}\ \mathrm A`,raw`i_1=i_2+i_6=6\ \mathrm A`),
  ],
  unknowns:[voltage('V_B','B',2480,29),voltage('V_C','C',2260,29)],matrix:[[13,-4],[-6,13]],rhs:[800,500],
  conclusion:'Todas las corrientes son positivas respecto a sus referencias. En B: 84/29 = 62/29 +22/29. En C: 22/29 +90/29 = 112/29. El término 140 V incluye la subida de 40 V; no se debe omitir.',
};
const practice7 = {
  method:'Supernodo B–C',
  convention:'G = 0 V y A = 6 V. I1 se supone de A a B, I2 desciende por el resistor central de 4 Ω e I3 baja por el resistor derecho de 6 Ω. La batería central impone VB − VC = 12 V.',
  steps:[
    step('Sumamos las corrientes que salen del supernodo B–C. La corriente interna de la batería de 12 V no entra en esta KCL.',raw`\frac{V_B-6}{2}+\frac{V_B}{6}+\frac{V_C}{4}=0`,raw`V_B-V_C=12`),
    step('Multiplicando KCL por 12: 8VB +3VC = 36. Sustituimos VC = VB −12.',raw`8V_B+3(V_B-12)=36`,raw`11V_B=72`),
    step('Se calculan las corrientes con las referencias declaradas:',raw`I_1=\frac{6-V_B}{2}=-\frac3{11}\ \mathrm A`,raw`I_2=\frac{V_C}{4}=-\frac{15}{11}\ \mathrm A`,raw`I_3=\frac{V_B}{6}=\frac{12}{11}\ \mathrm A`),
  ],
  unknowns:[voltage('V_B','B',72,11),voltage('V_C','C',-60,11)],matrix:[[8,3],[1,-1]],rhs:[36,12],
  conclusion:'I1 va realmente de B a A, I2 sube y I3 baja. La rama central es la de 4 Ω; intercambiarla con la de 6 Ω cambia el circuito. KCL: −3/11 = −15/11 +12/11 A.',
};
const practice8 = {
  method:'Nodo común con tres fuentes',
  convention:'U = V(S) − V(0). I1 baja por el centro, I2 baja por la izquierda e I3 sube por la derecha. Para plantear KCL se usa temporalmente la corriente derecha descendente Jder = −I3.',
  steps:[
    step('Expresamos tres corrientes descendentes para la ecuación nodal:',raw`I_2=\frac{U-2}{2}`,raw`I_1=\frac{U-1}{3}`,raw`J_{der}=\frac{U-4}{5}=-I_3`),
    step('KCL multiplicada por 30:',raw`\frac{U-2}{2}+\frac{U-1}{3}+\frac{U-4}{5}=0`,raw`15(U-2)+10(U-1)+6(U-4)=0`,raw`31U=64`),
    step('Se invierte el signo de Jder para expresar la corriente I3 con su referencia ascendente.',raw`I_1=\frac{11}{31}\ \mathrm A`,raw`I_2=\frac1{31}\ \mathrm A`,raw`J_{der}=-\frac{12}{31}\ \mathrm A`,raw`I_3=-J_{der}=\frac{12}{31}\ \mathrm A`),
  ],
  unknowns:[voltage('U','T1',64,31)],matrix:[[31]],rhs:[64],
  conclusion:'Las tres corrientes I1, I2 e I3 son positivas en sus propias referencias. No debe asignarse a I3 el signo de Jder: son referencias opuestas. KCL: I1 + I2 = I3.',
};
const practice9 = {
  method:'Tres mallas y corrientes compartidas',
  convention:'M1 superior izquierda, M2 superior derecha y M3 inferior; todas horarias. Las fuentes verticales tienen + arriba y la fuente inferior tiene + a la izquierda.',
  steps:[
    step('Las fuentes aportan −10 V a la malla 1, +20 V a la 2 y +20 V a la 3.',raw`4M_1+(M_1-M_3)=-10`,raw`3M_2+2(M_2-M_3)=20`,raw`4M_3+(M_3-M_1)+2(M_3-M_2)=20`),
    step('De las dos primeras ecuaciones: M1 = (M3 −10)/5 y M2 = (20 +2M3)/5. Sustituimos en la tercera.',raw`-\frac{M_3-10}{5}-2\frac{20+2M_3}{5}+7M_3=20`,raw`30M_3=130`),
    step('Para las ramas compartidas se usa la referencia izquierda → derecha, que corresponde a M3 menos la malla superior.',raw`I_{1\Omega}=M_3-M_1=\frac{82}{15}\ \mathrm A`,raw`I_{2\Omega}=M_3-M_2=-\frac75\ \mathrm A`),
  ],
  unknowns:[current('M_1','topLeft',-17,15),current('M_2','topRight',86,15),current('M_3','leftBottom',13,3)],matrix:[[5,0,-1],[0,5,-2],[-1,-2,7]],rhs:[-10,20,20],
  conclusion:'M1 resulta antihoraria; M2 y M3 horarias. En 1 Ω circulan 5.4667 A hacia la derecha; en 2 Ω, el valor de referencia es −1.4000 A y la magnitud real es 1.4000 A hacia la izquierda.',
};
const practice10 = {
  method:'Cuatro ramas en paralelo',
  convention:'U = V(S) − V(0). Todas las referencias son descendentes. La fuente de 360 V tiene el positivo abajo, al contrario de las de 40 y 80 V.',
  steps:[
    step('La fuente invertida produce una subida al descender: U = 20I360 −360. Por eso su corriente lleva U +360, no U −360.',raw`I_{200}=\frac U{200}`,raw`I_{40}=\frac{U-40}{80}`,raw`I_{360}=\frac{U+360}{20}`,raw`I_{80}=\frac{U-80}{70}`),
    step('KCL y multiplicación por 2800:',raw`\frac U{200}+\frac{U-40}{80}+\frac{U+360}{20}+\frac{U-80}{70}=0`,raw`14U+35(U-40)+140(U+360)+40(U-80)=0`,raw`229U=-45800`),
    step('Al sustituir U = −200 V:',raw`I_{200}=-1\ \mathrm A`,raw`I_{40}=-3\ \mathrm A`,raw`I_{360}=8\ \mathrm A`,raw`I_{80}=-4\ \mathrm A`),
  ],
  unknowns:[voltage('U','T1',-200)],matrix:[[229]],rhs:[-45800],
  conclusion:'Tres ramas conducen hacia arriba y la de 360 V conduce 8 A hacia abajo. KCL: −1 −3 +8 −4 = 0 A. Un potencial superior negativo respecto a la referencia es físicamente válido.',
};

export const lessons = {example1,example2,example3,example4,practice1,practice2:example1,practice3,practice4,practice5,practice6,practice7,practice8,practice9,practice10};

import { standardLessons } from './standardLessons.js';

// Sistemas y fracciones independientes del motor eléctrico.
const audits = {
  example1: {"unknowns":[{"symbol":"I_1","kind":"current","id":"middle","exact":[2,1],"unit":"A"},{"symbol":"I_2","kind":"current","id":"upperR","exact":[-3,1],"unit":"A"},{"symbol":"I_3","kind":"current","id":"lower","exact":[-1,1],"unit":"A"}],"matrix":[[1,1,-1],[6,-4,0],[3,0,1]],"rhs":[0,24,5],"conclusion":"I2 = −3 A significa una magnitud de 3 A que baja de e a b por 4 Ω. I3 = −1 A significa una magnitud de 1 A de a a d por 2 Ω, hacia la derecha. Las flechas del modo «Sentido real» ya incluyen esta inversión."},
  example2: {"unknowns":[{"symbol":"I_1","kind":"current","id":"branch0","exact":[412,1081],"unit":"A"},{"symbol":"I_2","kind":"current","id":"branch2","exact":[-880,1081],"unit":"A"},{"symbol":"I_3","kind":"current","id":"branch1","exact":[1292,1081],"unit":"A"}],"matrix":[[1,-1,-1],[35.5,0,6.25],[0,-9.25,6.25]],"rhs":[0,21,15],"conclusion":"Las ramas izquierda y derecha aportan corriente hacia S; la central la devuelve al nodo O. I2 conserva el signo negativo respecto a su referencia descendente."},
  example3: {},
  example4: {"matrix":[[35,-8,-2],[-8,36,-8],[-2,-8,22]],"rhs":[25,-35,10]},
  practice1: {"unknowns":[{"symbol":"I_1","kind":"current","id":"branch0","exact":[-11,12],"unit":"A"},{"symbol":"I_2","kind":"current","id":"branch1","exact":[1,2],"unit":"A"},{"symbol":"I_3","kind":"current","id":"branch2","exact":[-17,12],"unit":"A"}],"matrix":[[1,-1,-1],[-6,-3,0],[0,3,-6]],"rhs":[0,4,10],"conclusion":"U = −4.5 V en las tres ramas. I1 e I3 tienen signo negativo. I3 = −1.4167 A respecto a a → b significa una magnitud de 1.4167 A de b hacia a, hacia arriba."},
  practice3: {},
  practice4: {},
  practice5: {"matrix":[[7,-4],[-4,10]],"rhs":[-20,8]},
  practice6: {},
  practice7: {},
  practice8: {},
  practice9: {"matrix":[[5,0,-1],[0,5,-2],[-1,-2,7]],"rhs":[-10,20,20]},
  practice10: {},
  practice2: {"unknowns":[{"symbol":"I_1","kind":"current","id":"middle","exact":[2,1],"unit":"A"},{"symbol":"I_2","kind":"current","id":"upperR","exact":[-3,1],"unit":"A"},{"symbol":"I_3","kind":"current","id":"lower","exact":[-1,1],"unit":"A"}],"matrix":[[1,1,-1],[6,-4,0],[3,0,1]],"rhs":[0,24,5],"conclusion":"I2 = −3 A significa una magnitud de 3 A que baja de e a b por 4 Ω. I3 = −1 A significa una magnitud de 1 A de a a d por 2 Ω, hacia la derecha. Las flechas del modo «Sentido real» ya incluyen esta inversión."},
};

export const lessons = Object.fromEntries(Object.entries(standardLessons).map(([id, lesson]) => [id, {
  ...audits[id], ...lesson, method: 'Nodos y mallas por sustitución', image: '/originales/' + lesson.image,
}]));

# Circuitos originales y resolución

La referencia es `Leyes de Kirchhoff, 326, oficial (1).docx`, proporcionado por
el usuario. Las figuras de los cuatro problemas ilustrativos y las diez
prácticas se extrajeron sin modificar sus bytes a `public/originales`.
La figura original se presenta por defecto; el diagrama interactivo es un
apoyo desplegable. Sus disposiciones pueden diferir, pero conservan las
conexiones, componentes, valores y polaridades.

## Correspondencia con el documento

| Problema | Imagen dentro de word/media |
| --- | --- |
| Ejemplo 1 | image6.png |
| Ejemplo 2 | image7.jpeg |
| Ejemplo 3 | image8.jpeg |
| Ejemplo 4 | image9.png |
| Práctica 1 | image10.png |
| Práctica 2 | image11.png |
| Práctica 3 | image12.jpeg |
| Práctica 4 | image13.jpeg |
| Práctica 5 | image14.jpeg |
| Práctica 6 | image15.png |
| Práctica 7 | image16.png |
| Práctica 8 | image17.png |
| Práctica 9 | image18.jpeg |
| Práctica 10 | image19.jpeg |

El enunciado textual del ejemplo 1 dice «tres generadores», mientras su figura
muestra dos fuentes, de 14 V y 10 V. Se conserva el texto original y se resuelve
el circuito dibujado, sin añadir una tercera fuente.

## Procedimiento didáctico

Todas las resoluciones usan corrientes de rama y el mismo orden:

1. Declarar sentidos y aplicar la ley de nodos.
2. Recorrer explícitamente cada malla.
3. Escribir suma de voltajes de fuentes = suma de productos RI.
4. Sustituir las relaciones de nodos y resolver por sustitución.
5. Recuperar las corrientes y comprobar las ecuaciones.

Las fuentes son positivas al cruzarlas de − a + y negativas de + a −.
En el lado derecho, RI es positivo a favor de la corriente supuesta y
negativo en contra. Estos signos corresponden a la igualdad anterior.
No se introducen supernodos, potenciales desconocidos ni corrientes de
malla en los desarrollos. Las diferencias de corrientes de las ramas
compartidas se deducen de los nodos antes de sustituirlas.

Se mantienen las flechas originales donde existen. En ejemplos sin flechas
se declaran referencias de rama. El ejemplo 3 responde también α + β = 8;
la práctica 3 incluye Vc − Vf = 900/13 V, como pide su enunciado.

## Código y comprobaciones

- `src/data/circuits.js`: modelo eléctrico y referencias de corriente.
- `src/data/standardLessons.js`: pasos y ecuaciones de las 14 resoluciones.
- `src/data/lessons.js`: sistemas y fracciones para la comprobación.
- `src/lib/circuitSolver.js`: motor numérico independiente para verificar.
- `src/components/ui/CircuitLesson.jsx`: figura original y desarrollo.
- `tests/derivations.test.js`: evalúa cada igualdad intermedia con las
  corrientes del circuito, incluidas conversiones a mA y resultados derivados.
- `tests/lessons.test.js`: sistemas, fracciones y sintaxis matemática.
- `tests/circuits.test.js`: corrientes, nodos, tensiones, potencia e inversión
  de las referencias de corriente.

El motor interno conserva su análisis numérico nodal, separado del método
didáctico solicitado. `from → to` define cada referencia positiva; `drop`
es la caída de fuente en ese sentido. El nodo `ground` fija el cero de
potencial del cálculo. O identifica la barra inferior cuando el original
no la nombra; no representa una conexión física a tierra.

Los valores `expected` solo se usan en pruebas. La aplicación calcula las
corrientes desde el circuito. Las flechas reales invierten las negativas;
las ecuaciones siempre conservan las referencias declaradas.

Validación local: `npm test`, `npm run lint` y `npm run build`.

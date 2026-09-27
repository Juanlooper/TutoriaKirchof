# Circuitos: fuente y convenciones

Los 4 ejemplos y las 10 prácticas se contrastaron con las figuras de
`Guia_resuelta_Leyes_de_Kirchhoff.pdf` proporcionada por el usuario.
La propiedad `page` de cada circuito identifica la página de su figura.
El PDF y sus imágenes no se necesitan para ejecutar la aplicación.

## Organización

- `src/data/circuits.js`: nodos, conexiones, componentes y referencias de corriente.
- `src/lib/circuitSolver.js`: análisis de ramas en corriente continua mediante
  potenciales nodales y corrientes de rama, con eliminación gaussiana y pivoteo.
- `src/components/ui/CircuitDiagram.jsx`: representación y controles accesibles.
- `src/components/ui/CircuitElements.jsx`: símbolos SVG orientados con la rama.
- `tests/circuits.test.js`: regresiones numéricas y comprobaciones de conservación.

No hay valores de corriente codificados en el renderizador. Se calculan desde
las fuentes y resistencias. La tabla de respuestas usa el mismo catálogo.
Los valores `expected` del catálogo son referencias de la guía usadas solo por
las pruebas; nunca alimentan el cálculo ni la animación.

## Convenciones

- Resistencias en ohmios, fuentes en voltios y corrientes internas en amperios.
- `from → to` es la referencia positiva de cada corriente.
- `drop` de una batería es `V(from) − V(to)` a través de esa fuente: positivo
  significa placa larga y signo + hacia `from`; negativo, hacia `to`.
- Una rama cumple `V(from) − V(to) = R·I + suma(drop)`.
- El nodo `ground` fija el cero de potencial, sin imponer una tierra física.
- Las animaciones muestran corriente convencional, no electrones ni velocidad
  proporcional a la intensidad. Permanecen desactivadas al entrar y respetan
  la preferencia del sistema de reducir movimiento.
- Las flechas reales invierten las referencias cuando la corriente es negativa.
  La tabla mantiene el signo respecto a la referencia, independientemente del
  modo de flechas.
- En las prácticas con dos barras, los elementos en serie se disponen en línea
  para facilitar la lectura. Se conservan sus valores y polaridades; S y 0
  nombran las barras cuando el enunciado no utiliza otros nombres.

## Correcciones destacadas

- Ejemplo 1 / práctica 2: fuente de 14 V y resistor de 4 Ω en la rama superior;
  fuente de 10 V y resistor de 6 Ω en la central; I3 se supone de derecha a
  izquierda por la resistencia inferior y circula realmente a la derecha.
- Ejemplo 2: se conservan las fuentes de 12 V y 24 V opuestas, además de todas
  las resistencias internas. Su contribución conjunta es una caída de 12 V.
- Ejemplo 3: se restauran resistencias de 20, 10, 2, 3 y 5 Ω y el supernodo.
- Ejemplo 4: se restauran las tres ventanas y los resistores de 5 y 10 Ω del
  lado izquierdo, además de la fuente horizontal de 5 V.
- Práctica 1: tres ramas de 6, 3 y 6 Ω y fuentes de 10, 6 y 4 V.
- Práctica 3: se muestran mA, conservando A internamente.
- Práctica 4: resistencias centrales de 5+1 Ω y derechas de 3+1 Ω separadas.
- Práctica 5: mallas superior e inferior con resistor compartido de 4 Ω.
- Práctica 6: se restauran A, B, C, D, E y la rama B–C de 10 Ω.
- Práctica 7: I2 atraviesa el resistor central de 4 Ω e I3 el derecho de 6 Ω.
- Práctica 8: I3 tiene referencia ascendente, coherente con su signo positivo.
- Práctica 9: las fuentes de 10 y 20 V son verticales; los resistores de 1 y
  2 Ω están en las ramas horizontales compartidas.
- Práctica 10: fuente de 360 V invertida respecto de las de 40 y 80 V.

## Verificación

`npm test` comprueba las 14 soluciones, KCL en todos los nodos, la relación de
tensión de cada rama y el balance global de potencia. Incluye regresiones para
supernodos, unidades, fuentes opuestas, inversión de referencia y cambios de
resistencia. No sustituye comparar una nueva topología con su figura original.

El modelo cubre resistencias y fuentes ideales independientes de tensión en
estado estacionario. No modela transitorios, capacitancias ni inductancias.

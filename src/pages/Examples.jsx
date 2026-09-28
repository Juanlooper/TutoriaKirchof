import { motion } from 'framer-motion';
import CircuitLesson from '../components/ui/CircuitLesson';

export default function Examples() {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-center mb-4">2. Problemas ilustrativos</h1>
    <p className="text-center">Los problemas originales, resueltos con nodos y mallas por sustitución. En cada malla: suma de fuentes = suma de voltajes en las resistencias.</p>
    <nav className="lesson-index" aria-label="Ir a un ejemplo">{Array.from({length:4},(_,i)=><a key={i} href={`#example${i+1}`}>Ejemplo {i+1}</a>)}</nav>
    {Array.from({length:4},(_,i)=><CircuitLesson key={i} circuitId={`example${i+1}`} title={`Problema ilustrativo ${i+1}`} />)}
  </motion.div>;
}

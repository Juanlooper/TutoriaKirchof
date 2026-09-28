import { motion } from 'framer-motion';
import CircuitLesson from '../components/ui/CircuitLesson';

export default function Exercises() {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-center mb-4">3. Asignación Práctica #14</h1>
    <p className="text-center">Encuentre las corrientes en cada uno de los siguientes circuitos, aplicando las leyes de Kirchhoff. Compruebe sus respuestas.</p>
    <nav className="lesson-index" aria-label="Ir a una práctica">{Array.from({length:10},(_,i)=><a key={i} href={`#practice${i+1}`}>Práctica {i+1}</a>)}</nav>
    {Array.from({length:10},(_,i)=><CircuitLesson key={i} circuitId={`practice${i+1}`} title={`Práctica ${i+1}`} />)}
  </motion.div>;
}

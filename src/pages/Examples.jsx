import { motion } from 'framer-motion';
import CircuitLesson from '../components/ui/CircuitLesson';

export default function Examples() {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-center mb-4">2. Problemas ilustrativos</h1>
    <p className="text-center">Cuatro resoluciones con referencias explícitas, resultados exactos y comprobación eléctrica.</p>
    {Array.from({length:4},(_,i)=><CircuitLesson key={i} circuitId={`example${i+1}`} title={`Problema ilustrativo ${i+1}`} />)}
  </motion.div>;
}

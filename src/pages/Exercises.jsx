import { motion } from 'framer-motion';
import CircuitLesson from '../components/ui/CircuitLesson';

export default function Exercises() {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-center mb-4">3. Asignación Práctica #14</h1>
    <p className="text-center">Un resultado negativo conserva su signo: la magnitud es positiva y el sentido real invierte la referencia.</p>
    {Array.from({length:10},(_,i)=><CircuitLesson key={i} circuitId={`practice${i+1}`} title={`Práctica ${i+1}`} />)}
  </motion.div>;
}

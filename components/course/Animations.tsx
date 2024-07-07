import { motion } from "framer-motion";
import {
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export const Checkmark = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
    className="absolute inset-0 flex justify-center items-center text-green-500"
  >
    <div className="bg-green-100 h-full w-full rounded-lg p-4 flex items-center justify-center flex-col">
      <IoCheckmarkCircleOutline className="w-16 h-16" />
      <div className="mt-2">Super! Deine Antwort ist richtig</div>
    </div>
  </motion.div>
);

export const Cross = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
    className="absolute inset-0 flex justify-center items-center text-red-500"
  >
    <div className="bg-red-100 h-full w-full rounded-lg p-4 flex items-center justify-center flex-col">
      <IoCloseCircleOutline className="w-16 h-16 text-red-500" />
      <div className="mt-2">Leider ist deine Antwort falsch</div>
    </div>
  </motion.div>
);

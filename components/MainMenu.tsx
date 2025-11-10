
import React from 'react';
import { motion } from 'framer-motion';
import { TuningSystem } from '../types';

interface MainMenuProps {
  tunings: TuningSystem[];
  onSelect: (tuning: TuningSystem) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  exit: { y: -20, opacity: 0 }
};

const MainMenu: React.FC<MainMenuProps> = ({ tunings, onSelect }) => {
  return (
    <motion.div 
      className="text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 
        className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4"
        variants={itemVariants}
      >
        Resonancias Ocultas
      </motion.h1>
      <motion.p className="text-lg md:text-xl text-gray-300 mb-12" variants={itemVariants}>
        Una exploración interactiva de sistemas de afinación microtonal.
      </motion.p>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
      >
        {tunings.map((tuning) => (
          <motion.div
            key={tuning.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05,
                boxShadow: "0px 0px 30px rgba(76, 209, 255, 0.4)",
                borderColor: "rgba(76, 209, 255, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm transition-colors duration-300"
            onClick={() => onSelect(tuning)}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-cyan-300">{tuning.name}</h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;

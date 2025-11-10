import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  onRestore: () => void;
  initialUrl: string;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0, scale: 0.8 },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 25 }
  },
  exit: {
    y: "50vh",
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const UrlModal: React.FC<UrlModalProps> = ({ isOpen, onClose, onSave, onRestore, initialUrl }) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl, isOpen]);

  const handleSave = () => {
    onSave(url); // Pass even if empty, parent will handle trimming and logic
    onClose();
  };
  
  const handleRestore = () => {
      onRestore();
      onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg bg-gray-900 border border-cyan-500/30 rounded-xl p-6 shadow-2xl shadow-cyan-500/10"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Cambiar URL de Audio</h2>
            <p className="text-gray-400 mb-4 text-sm">
              Pega un enlace de Google Drive o un enlace de descarga directa (MP3, WAV). Para restaurar, guárdalo en blanco.
            </p>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="https://..."
            />
            <div className="mt-6 flex justify-between items-center space-x-2">
              <button
                onClick={handleRestore}
                className="px-4 py-2 bg-yellow-800/50 text-yellow-200 rounded-md hover:bg-yellow-700/70 transition-colors"
              >
                Restaurar Original
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrlModal;

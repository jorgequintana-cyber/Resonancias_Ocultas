import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TuningSystem } from '../types';
import { audioService } from '../services/audioService';
import { PlayIcon, BackIcon, StopIcon, LinkIcon } from './Icons';

interface TuningDetailProps {
  tuning: TuningSystem;
  onBack: () => void;
  onUrlChange: (tuningId: string, url: string | null) => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1
    } 
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};


const TuningDetail: React.FC<TuningDetailProps> = ({ tuning, onBack, onUrlChange }) => {

  const hasCustomUrl = useMemo(() => {
    // This now depends on the actual audioUrl prop to ensure it re-renders when the state updates.
    return !!localStorage.getItem(`customAudioUrl_${tuning.id}`);
  }, [tuning.id, tuning.piece.audioUrl]);

  useEffect(() => {
    // Stop any lingering sounds when the component unmounts or tuning changes
    return () => {
      audioService.stopAllSounds();
    };
  }, []);

  const playScale = () => {
    audioService.stopAllSounds();
    const frequencies = tuning.scale.ratios.map(r => tuning.baseFrequency * r);
    audioService.playScale(frequencies);
  };

  const playChord = (intervals: number[]) => {
    audioService.stopAllSounds();
    const frequencies = intervals.map(i => tuning.baseFrequency * tuning.scale.ratios[i]);
    audioService.playChord(frequencies);
  };
  
  const playThePiece = () => {
    audioService.stopAllSounds();
    if (tuning.piece.audioUrl) {
      audioService.playAudioFromUrl(tuning.piece.audioUrl);
    } else if (tuning.piece.noteSequence) {
      audioService.playPiece(tuning.baseFrequency, tuning.scale.ratios, tuning.piece.noteSequence);
    }
  };

  const showChangeUrlPrompt = () => {
    const currentUrl = localStorage.getItem(`customAudioUrl_${tuning.id}`) || tuning.piece.audioUrl || '';
    const newUrl = window.prompt(
        'Asigna una URL de audio personalizada.\n\n- Pega un enlace de Google Drive (se convertirá automáticamente).\n- O pega un enlace de descarga directa a un archivo de audio (MP3, WAV, etc.).\n\nDéjalo en blanco para restaurar el original.',
        currentUrl
    );

    if (newUrl !== null) {
        const trimmedUrl = newUrl.trim();
        if (trimmedUrl === '') {
            onUrlChange(tuning.id, null); // Restore default
        } else {
            onUrlChange(tuning.id, trimmedUrl); // Set new URL
        }
    }
  };

  const handlePieceMouseDown = (e: React.MouseEvent) => {
    // Using onMouseDown is more reliable for detecting modifier keys
    if (e.shiftKey) {
      e.preventDefault(); // Prevent default actions like text selection
      showChangeUrlPrompt();
    }
  };

  const handlePieceClick = (e: React.MouseEvent) => {
    // A regular click (without shift) will play the piece
    if (!e.shiftKey) {
      playThePiece();
    }
  };
  
  const handleBack = () => {
    audioService.stopAllSounds();
    onBack();
  }

  return (
    <motion.div
      className="w-full max-w-4xl bg-gray-900/30 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex justify-between items-center mb-6" variants={itemVariants}>
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">{tuning.name}</h1>
        <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
          <BackIcon className="w-6 h-6 text-cyan-300" />
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-xl font-semibold text-gray-300 border-b border-gray-700 pb-2">Opciones Interactivas</h2>
          
          <div className="flex flex-col space-y-3">
              <button onClick={playScale} className="flex items-center justify-between w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-md transition-all duration-200">
                <span>Escuchar Escala</span>
                <PlayIcon className="w-5 h-5 text-cyan-400" />
              </button>
              
              <div className="pl-4 border-l-2 border-gray-700 space-y-3">
                 <p className="text-gray-400">Acordes Comunes:</p>
                 {tuning.chords.map((chord, index) => (
                    <button key={index} onClick={() => playChord(chord.intervals)} className="flex items-center justify-between w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-md transition-all duration-200">
                      <span>{chord.name}</span>
                      <PlayIcon className="w-5 h-5 text-cyan-400" />
                    </button>
                 ))}
              </div>
              
              <button 
                onClick={handlePieceClick}
                onMouseDown={handlePieceMouseDown}
                onContextMenu={(e) => e.preventDefault()}
                className="flex items-center justify-between w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-md transition-all duration-200 group"
                title="Click para reproducir. Shift+Click para cambiar audio."
              >
                <div className="flex items-center gap-2">
                  <span>Escuchar Pieza Corta</span>
                  {hasCustomUrl && <LinkIcon className="w-4 h-4 text-cyan-400" />}
                </div>
                <PlayIcon className="w-5 h-5 text-cyan-400" />
              </button>

              <button onClick={() => audioService.stopAllSounds()} className="flex items-center justify-between w-full text-left p-3 bg-red-900/50 hover:bg-red-800/70 rounded-md transition-all duration-200">
                <span>Detener Sonido</span>
                <StopIcon className="w-5 h-5 text-red-300" />
              </button>
          </div>
        </motion.div>

        <motion.div className="space-y-4" variants={itemVariants}>
            <div className="border-b border-gray-700 pb-2">
              <h2 className="text-xl font-semibold text-gray-300">Panel Informativo</h2>
            </div>
            <p className="text-gray-400 leading-relaxed bg-black/30 p-4 rounded-md">
              {tuning.description}
            </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TuningDetail;
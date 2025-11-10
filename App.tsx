
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TuningSystem } from './types';
import { TUNING_SYSTEMS } from './constants';
import MainMenu from './components/MainMenu';
import TuningDetail from './components/TuningDetail';

const App: React.FC = () => {
  const [tunings, setTunings] = useState<TuningSystem[]>([]);
  const [selectedTuning, setSelectedTuning] = useState<TuningSystem | null>(null);

  useEffect(() => {
    // On initial load, create a copy of the tunings and apply any custom URLs from localStorage
    const loadedTunings = TUNING_SYSTEMS.map(tuning => {
      const customUrl = localStorage.getItem(`customAudioUrl_${tuning.id}`);
      if (customUrl) {
        return {
          ...tuning,
          piece: { ...tuning.piece, audioUrl: customUrl },
        };
      }
      return tuning;
    });
    setTunings(loadedTunings);
  }, []);

  const handleUpdateTuningUrl = (tuningId: string, url: string | null) => {
    if (url) {
      localStorage.setItem(`customAudioUrl_${tuningId}`, url);
    } else {
      localStorage.removeItem(`customAudioUrl_${tuningId}`);
    }

    // Create a fresh array with the latest data from constants and localStorage
    const updatedTunings = TUNING_SYSTEMS.map(tuning => {
      const customUrl = localStorage.getItem(`customAudioUrl_${tuning.id}`);
      if (customUrl) {
        return {
          ...tuning,
          piece: { ...tuning.piece, audioUrl: customUrl },
        };
      }
      return tuning;
    });
    setTunings(updatedTunings);

    // If the currently selected tuning is the one that was updated,
    // update its state as well to force a re-render with the new data.
    if (selectedTuning && selectedTuning.id === tuningId) {
      const newlyUpdatedTuning = updatedTunings.find(t => t.id === tuningId);
      if (newlyUpdatedTuning) {
        setSelectedTuning(newlyUpdatedTuning);
      }
    }
  };


  const handleSelectTuning = (tuning: TuningSystem) => {
    setSelectedTuning(tuning);
  };

  const handleBack = () => {
    setSelectedTuning(null);
  };

  return (
    <div className="min-h-screen w-full bg-black bg-grid-white/[0.05] relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <AnimatePresence mode="wait">
        {selectedTuning ? (
          <TuningDetail
            key={selectedTuning.id}
            tuning={selectedTuning}
            onBack={handleBack}
            onUrlChange={handleUpdateTuningUrl}
          />
        ) : (
          <MainMenu
            key="main-menu"
            tunings={tunings}
            onSelect={handleSelectTuning}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

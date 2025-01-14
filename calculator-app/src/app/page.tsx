'use client';

import React, { useState } from 'react';
import SuggestedWorkouts from '../components/SuggestedWorkouts';
import NeuralCompute from '../components/NeuralCompute';
import CalculationHistory from '../components/CalculationHistory';
import { workoutConcepts, WorkoutConcept } from '../utils/calculatorData';

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [conceptsHistory, setConceptsHistory] = useState<WorkoutConcept | null>(null);

  const handleCalculation = (calculation: string) => {
    setHistory(prev => [calculation, ...prev].slice(0, 10));
  };

  const handleConceptClick = (concept: string) => {
    const conceptData = workoutConcepts[concept];
    if (conceptData) {
      setConceptsHistory(conceptData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-black mb-8 tracking-tight">
        Smart{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
          Calculator
        </span>
      </h1>
      <div className="flex gap-8 items-stretch h-[600px] max-w-[1400px] w-full justify-center">
        <SuggestedWorkouts onConceptClick={handleConceptClick} />
        <NeuralCompute onCalculation={handleCalculation} />
        <CalculationHistory
          history={history}
          conceptsHistory={conceptsHistory}
          onClearHistory={() => setHistory([])}
          onBackToHistory={() => setConceptsHistory(null)}
        />
      </div>
    </div>
  );
}

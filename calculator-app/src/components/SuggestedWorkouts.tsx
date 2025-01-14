'use client';

import React from 'react';
import { workoutConcepts } from '../utils/calculatorData';

interface SuggestedWorkoutsProps {
  onConceptClick: (concept: string) => void;
}

const SuggestedWorkouts: React.FC<SuggestedWorkoutsProps> = ({ onConceptClick }) => {
  return (
    <div className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl w-96 hidden lg:flex lg:flex-col">
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative p-2 bg-black/50 rounded-xl border border-white/20 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[0.65rem] font-medium tracking-wider text-cyan-300 uppercase">Quick Access</span>
            <h2 className="text-lg font-black tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                Suggested
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 animate-gradient">
                Workouts
              </span>
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mt-1"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-lg">TNPSC</h3>
            <div className="space-y-1">
              {Object.keys(workoutConcepts)
                .filter(key => workoutConcepts[key].category === 'TNPSC')
                .map((concept) => (
                  <button
                    key={concept}
                    onClick={() => onConceptClick(concept)}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors"
                  >
                    {concept}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold text-lg">Aptitude</h3>
            <div className="space-y-1">
              {Object.keys(workoutConcepts)
                .filter(key => workoutConcepts[key].category === 'Aptitude')
                .map((concept) => (
                  <button
                    key={concept}
                    onClick={() => onConceptClick(concept)}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors"
                  >
                    {concept}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold text-lg">Special</h3>
            <div className="space-y-1">
              {Object.keys(workoutConcepts)
                .filter(key => workoutConcepts[key].category === 'Special')
                .map((concept) => (
                  <button
                    key={concept}
                    onClick={() => onConceptClick(concept)}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors"
                  >
                    {concept}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedWorkouts; 
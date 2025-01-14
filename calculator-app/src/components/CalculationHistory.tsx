'use client';

import React from 'react';
import { WorkoutConcept } from '../utils/calculatorData';

interface CalculationHistoryProps {
  history: string[];
  conceptsHistory: WorkoutConcept | null;
  onClearHistory: () => void;
  onBackToHistory: () => void;
}

const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  history,
  conceptsHistory,
  onClearHistory,
  onBackToHistory
}) => {
  return (
    <div className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl w-[420px] hidden md:flex md:flex-col">
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative p-2 bg-black/50 rounded-xl border border-white/20 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[0.65rem] font-medium tracking-wider text-cyan-300 uppercase">Real-Time</span>
            <h2 className="text-lg font-black tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                {conceptsHistory ? 'Concept' : 'Calculation'}
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 animate-gradient">
                {conceptsHistory ? 'Guide' : 'History'}
              </span>
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mt-1"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => conceptsHistory ? onBackToHistory() : onClearHistory()}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          {conceptsHistory ? 'Back to History' : 'Clear'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conceptsHistory ? (
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">{conceptsHistory.title}</h3>
              <div className="space-y-2">
                {conceptsHistory.steps.map((step, index) => (
                  <p key={index} className="text-white/90">{step}</p>
                ))}
                {conceptsHistory.formula && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-white/90 font-mono text-sm">Formula: {conceptsHistory.formula}</p>
                  </div>
                )}
              </div>
            </div>
            
            {conceptsHistory.example && (
              <div className="bg-white/10 p-4 rounded-xl">
                <h4 className="text-md font-semibold text-emerald-300 mb-2">
                  {conceptsHistory.example.title}
                </h4>
                <div className="space-y-3">
                  <p className="text-white/80 text-sm bg-black/20 p-2 rounded">
                    Problem: {conceptsHistory.example.problem}
                  </p>
                  <div className="space-y-1">
                    {conceptsHistory.example.solution.map((step, index) => (
                      <p key={index} className="text-white/90 text-sm pl-2 border-l border-white/20">
                        {step}
                      </p>
                    ))}
                  </div>
                  <p className="text-emerald-300 font-medium mt-2 bg-emerald-500/10 p-2 rounded">
                    {conceptsHistory.example.result}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {history.length === 0 ? (
              <p className="text-white/50 text-center py-4">No calculations yet</p>
            ) : (
              history.map((calc, index) => (
                <div 
                  key={index} 
                  className="text-white/90 p-3 rounded bg-white/5 text-right hover:bg-white/10 transition-colors"
                >
                  {calc}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationHistory; 
'use client';

import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [conceptsHistory, setConceptsHistory] = useState<{
    title: string;
    steps: string[];
    formula?: string;
    example?: {
      title: string;
      problem: string;
      solution: string[];
      result: string;
    };
  } | null>(null);

  const handleNumber = (number: string) => {
    if (display.length >= 16) return;

    if (isNewCalculation) {
      setDisplay(number);
      setIsNewCalculation(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setIsNewCalculation(false);
    setEquation(display + operator);
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      const formattedResult = Number(result).toString().slice(0, 16);
      const calculation = `${equation}${display} = ${formattedResult}`;
      setDisplay(formattedResult);
      setEquation('');
      setIsNewCalculation(true);
      setHistory(prev => [calculation, ...prev].slice(0, 10));
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewCalculation(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const workoutConcepts = {
    'Age Calculator': {
      title: 'Age Calculation',
      steps: [
        '1. Get the current date',
        '2. Get the birth date',
        '3. Subtract birth date from current date',
        '4. Consider months for accurate age'
      ],
      formula: 'Age = Current Date - Birth Date',
      example: {
        title: 'TNPSC Age Calculation Example',
        problem: 'Calculate age for TNPSC eligibility: Birth Date: 15-05-1995, Current Date: 14-01-2024',
        solution: [
          'Current Date: 14-01-2024',
          'Birth Date: 15-05-1995',
          'Years = 2024 - 1995 = 29',
          'Months = 01 - 05 = -4 months',
          'Final Age: 28 years 8 months'
        ],
        result: 'Candidate is 28 years 8 months old'
      }
    },
    'Percentage Calculator': {
      title: 'Percentage Calculation',
      steps: [
        '1. Identify the obtained marks',
        '2. Note the total marks',
        '3. Divide obtained marks by total marks',
        '4. Multiply by 100 for percentage'
      ],
      formula: 'Percentage = (Obtained Marks / Total Marks) × 100',
      example: {
        title: 'TNPSC Score Percentage Example',
        problem: 'Calculate percentage for General Studies: Obtained Marks: 142, Total Marks: 200',
        solution: [
          'Obtained Marks = 142',
          'Total Marks = 200',
          'Percentage = (142/200) × 100',
          'Percentage = 0.71 × 100'
        ],
        result: '71% achieved in General Studies'
      }
    },
    'Grade Calculator': {
      title: 'Grade Point Calculation',
      steps: [
        '1. Input marks obtained',
        '2. Compare with grade ranges',
        '3. Assign corresponding grade',
        '4. Calculate GPA if needed'
      ],
      formula: 'Grade = Based on mark ranges (90-100: A, 80-89: B, etc.)'
    },
    'Rank Predictor': {
      title: 'TNPSC Rank Prediction',
      steps: [
        '1. Enter marks in each subject',
        '2. Calculate total score',
        '3. Apply normalization formula',
        '4. Compare with previous year cutoffs'
      ],
      formula: 'Normalized Score = (Raw Score / Max Score) × 100',
      example: {
        title: 'TNPSC Group 2 Rank Example',
        problem: 'Predict rank with: GS: 165/200, Current Affairs: 85/100, Aptitude: 90/100',
        solution: [
          'Total Obtained = 165 + 85 + 90 = 340',
          'Maximum Total = 200 + 100 + 100 = 400',
          'Normalized Score = (340/400) × 100',
          'Compare with previous year cutoff: 85%'
        ],
        result: 'Expected Rank Range: 1500-2000 (Based on 85% normalized score)'
      }
    },
    'Cutoff Calculator': {
      title: 'Community Cutoff',
      steps: [
        '1. Select your community category',
        '2. Enter your marks',
        '3. Compare with reservation quotas',
        '4. Check eligibility'
      ],
      formula: 'Eligibility = Your Score ≥ Category Cutoff',
      example: {
        title: 'TNPSC Community Cutoff Example',
        problem: 'Check eligibility for BC category with score of 320/400',
        solution: [
          'Your Score = 320/400 = 80%',
          'BC Category Cutoff = 75%',
          'MBC Cutoff = 73%',
          'SC Cutoff = 70%'
        ],
        result: 'Eligible for BC category (Score 80% > Cutoff 75%)'
      }
    },
    'Mark Weightage': {
      title: 'Subject Weightage',
      steps: [
        '1. Enter subject marks',
        '2. Apply subject weightage',
        '3. Calculate weighted total',
        '4. Get final score'
      ],
      formula: 'Weighted Score = Σ(Subject Mark × Weight)'
    },
    'Age Limit': {
      title: 'TNPSC Age Eligibility',
      steps: [
        '1. Enter date of birth',
        '2. Select post category',
        '3. Check age restrictions',
        '4. Verify relaxation rules'
      ],
      formula: 'Eligible if: Min Age ≤ Your Age ≤ Max Age'
    },
    'Experience Points': {
      title: 'Experience Calculator',
      steps: [
        '1. Enter work duration',
        '2. Check eligible experience',
        '3. Calculate bonus points',
        '4. Add to total score'
      ],
      formula: 'Experience Points = Years of Service × Point per Year'
    },
    'Exam Timer': {
      title: 'Exam Time Management',
      steps: [
        '1. Set total exam duration',
        '2. Allocate time per section',
        '3. Track remaining time',
        '4. Set section alerts'
      ],
      formula: 'Time per Question = Total Time / Number of Questions'
    },
    'Score Analyzer': {
      title: 'Performance Analysis',
      steps: [
        '1. Enter section-wise marks',
        '2. Compare with averages',
        '3. Identify strong areas',
        '4. Calculate improvement needed'
      ],
      formula: 'Performance Index = (Your Score / Average Score) × 100'
    }
  };

  const handleConceptClick = (concept: string) => {
    const conceptData = workoutConcepts[concept as keyof typeof workoutConcepts];
    if (conceptData) {
      setConceptsHistory(conceptData);
    }
  };

  const buttons = [
    'C', '⌫', '÷', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-black mb-8 tracking-tight">
        Smart{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
          Calculator
        </span>
      </h1>
      <div className="flex gap-8 items-stretch h-[600px] max-w-[1400px] w-full justify-center">
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
                  <button onClick={() => handleConceptClick('Age Calculator')} 
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Age Calculator
                  </button>
                  <button onClick={() => handleConceptClick('Percentage Calculator')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Percentage Calculator
                  </button>
                  <button onClick={() => handleConceptClick('Grade Calculator')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Grade Calculator
                  </button>
                  <button onClick={() => handleConceptClick('Rank Predictor')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Rank Predictor
                  </button>
                  <button onClick={() => handleConceptClick('Cutoff Calculator')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Cutoff Calculator
                  </button>
                  <button onClick={() => handleConceptClick('Mark Weightage')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Mark Weightage
                  </button>
                  <button onClick={() => handleConceptClick('Age Limit')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Age Limit
                  </button>
                  <button onClick={() => handleConceptClick('Experience Points')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Experience Points
                  </button>
                  <button onClick={() => handleConceptClick('Exam Timer')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Exam Timer
                  </button>
                  <button onClick={() => handleConceptClick('Score Analyzer')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Score Analyzer
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-semibold text-lg">Aptitude</h3>
                <div className="space-y-1">
                  <button onClick={() => handleConceptClick('Time and Work')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Time and Work
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-semibold text-lg">Special</h3>
                <div className="space-y-1">
                  <button onClick={() => handleConceptClick('Leap Year')}
                    className="w-full text-left text-white/90 hover:text-white hover:bg-white/10 p-2 rounded transition-colors">
                    Leap Year Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative p-3 bg-black/50 rounded-2xl border border-white/20 backdrop-blur-xl">
              <h2 className="text-xl font-black text-center tracking-wide">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-lg">
                  Neural
                </span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-purple-300 drop-shadow-lg">
                  Compute
                </span>{' '}
                <span className="text-sm text-white/70">v2.0</span>
              </h2>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-200 h-6 text-right overflow-x-auto whitespace-nowrap custom-scrollbar px-2">
              {equation}
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-right overflow-x-auto custom-scrollbar">
              <span className="text-3xl font-light text-white" style={{ fontSize: display.length > 12 ? '1.5rem' : '1.875rem' }}>
                {display}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  switch (btn) {
                    case 'C': handleClear(); break;
                    case '⌫': handleBackspace(); break;
                    case '=': handleEqual(); break;
                    case '÷': handleOperator('/'); break;
                    case '×': handleOperator('*'); break;
                    case '+':
                    case '-': handleOperator(btn); break;
                    case '.': handleNumber('.'); break;
                    default: handleNumber(btn);
                  }
                }}
                className={`
                  ${btn === '=' ? 'bg-gradient-to-r from-blue-400 to-blue-500 col-span-1 row-span-2' : ''}
                  ${btn === 'C' ? 'bg-gradient-to-r from-red-400 to-pink-500' : ''}
                  ${btn === '⌫' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : ''}
                  ${!['=', 'C', '⌫'].includes(btn) ? 'bg-white/10' : ''}
                  hover:bg-white/30 transition-all duration-200
                  rounded-2xl p-4 text-xl text-white font-medium
                  backdrop-blur-sm shadow-lg
                  active:scale-95 active:shadow-inner
                  ${btn === '0' ? 'col-span-2' : ''}
                  ${btn === '.' ? 'col-span-1' : ''}
                `}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

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
              onClick={() => conceptsHistory ? setConceptsHistory(null) : clearHistory()}
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
      </div>
    </div>
  );
};

export default Calculator; 
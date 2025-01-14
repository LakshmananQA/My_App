'use client';

import React, { useState } from 'react';

interface NeuralComputeProps {
  onCalculation: (calculation: string) => void;
}

const NeuralCompute: React.FC<NeuralComputeProps> = ({ onCalculation }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const [activeTab, setActiveTab] = useState('General');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Button layouts for different tabs
  const generalButtons = [
    'C', '⌫', '÷', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
  ];

  const currencyButtons = [
    'C', '⌫', 'USD', 'EUR',
    '7', '8', '9', 'GBP',
    '4', '5', '6', 'JPY',
    '1', '2', '3', '=',
    '0', '.'
  ];

  const yearButtons = [
    'C', '⌫', 'Age', 'Diff',
    '7', '8', '9', 'Leap',
    '4', '5', '6', 'Days',
    '1', '2', '3', '=',
    '0', '.'
  ];

  const getActiveButtons = () => {
    switch (activeTab) {
      case 'Currency': return currencyButtons;
      case 'Year': return yearButtons;
      default: return generalButtons;
    }
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    // Here you would implement currency conversion logic
    // For now, we'll just show the selected currency
    setEquation(`Convert to ${currency}: ${display}`);
  };

  const handleYearFunction = (func: string) => {
    switch (func) {
      case 'Age':
        if (display.length === 4) {
          const year = parseInt(display);
          const age = new Date().getFullYear() - year;
          setDisplay(age.toString());
          setEquation(`Age from ${year}: `);
        }
        break;
      case 'Leap':
        if (display.length === 4) {
          const year = parseInt(display);
          const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
          setDisplay(isLeap ? 'Leap Year' : 'Not Leap');
          setEquation(`${year} is: `);
        }
        break;
      case 'Diff':
        if (equation && display) {
          const year1 = parseInt(equation);
          const year2 = parseInt(display);
          const diff = Math.abs(year2 - year1);
          setDisplay(diff.toString());
          setEquation(`${year1} to ${year2}: `);
        } else {
          setEquation(display);
          setDisplay('0');
        }
        break;
      case 'Days':
        if (display.length === 4) {
          const year = parseInt(display);
          const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
          setDisplay(isLeap ? '366' : '365');
          setEquation(`Days in ${year}: `);
        }
        break;
    }
  };

  const handleSpecialButton = (btn: string) => {
    switch (activeTab) {
      case 'Currency':
        if (['USD', 'EUR', 'GBP', 'JPY'].includes(btn)) {
          handleCurrencySelect(btn);
          return true;
        }
        break;
      case 'Year':
        if (['Age', 'Leap', 'Diff', 'Days'].includes(btn)) {
          handleYearFunction(btn);
          return true;
        }
        break;
    }
    return false;
  };

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
      let calculation = `${equation}${display} = ${formattedResult}`;
      
      // Add currency symbol if in currency mode
      if (activeTab === 'Currency' && selectedCurrency) {
        const currencySymbols: { [key: string]: string } = {
          'USD': '$',
          'EUR': '€',
          'GBP': '£',
          'JPY': '¥'
        };
        calculation = `${currencySymbols[selectedCurrency]}${calculation}`;
      }
      
      setDisplay(formattedResult);
      setEquation('');
      setIsNewCalculation(true);
      onCalculation(calculation);
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

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-md flex flex-col">
      {/* Header */}
      <div className="relative mb-4">
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

      {/* Tabs */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-sm"></div>
        <div className="relative flex gap-1 bg-black/20 p-1 rounded-xl backdrop-blur-sm">
          {['General', 'Currency', 'Year'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Display */}
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

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2 mt-auto">
        {getActiveButtons().map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (!handleSpecialButton(btn)) {
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
              }
            }}
            className={`
              ${btn === '=' ? 'bg-gradient-to-r from-blue-400 to-blue-500 col-span-1 row-span-2' : ''}
              ${btn === 'C' ? 'bg-gradient-to-r from-red-400 to-pink-500' : ''}
              ${btn === '⌫' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : ''}
              ${['USD', 'EUR', 'GBP', 'JPY'].includes(btn) ? 'bg-gradient-to-r from-green-400 to-emerald-500' : ''}
              ${['Age', 'Leap', 'Diff', 'Days'].includes(btn) ? 'bg-gradient-to-r from-purple-400 to-indigo-500' : ''}
              ${!['=', 'C', '⌫', 'USD', 'EUR', 'GBP', 'JPY', 'Age', 'Leap', 'Diff', 'Days'].includes(btn) ? 'bg-white/10' : ''}
              hover:bg-white/30 transition-all duration-200
              rounded-xl p-3 text-sm font-medium
              backdrop-blur-sm shadow-lg
              active:scale-95 active:shadow-inner
              ${btn === '0' ? 'col-span-2' : ''}
              ${btn === '.' ? 'col-span-1' : ''}
              min-h-[3rem] flex items-center justify-center
              text-white
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NeuralCompute; 
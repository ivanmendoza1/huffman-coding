import React, { useState } from 'react';
import SymbolInput from './components/SymbolInput';
import HuffmanTree from './components/HuffmanTree';
import Results from './components/Results';
import { calculateHuffman } from './utils/huffman';

const App = () => {
  const [numSymbols, setNumSymbols] = useState(0);
  const [inputSymbols, setInputSymbols] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [huffmanData, setHuffmanData] = useState(null);
  const [error, setError] = useState('');

  if (numSymbols === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Codificación Huffman</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Cantidad de símbolos (2-16):</label>
            <input
              type="number"
              min="2"
              max="16"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={inputSymbols}
              onChange={(e) => setInputSymbols(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => {
              const value = parseInt(inputSymbols);
              if (value >= 2 && value <= 16) {
                setNumSymbols(value);
                setSymbols(Array(value).fill().map((_, i) => ({ name: `X${i + 1}`, prob: '' })));
              } else {
                setError('La cantidad de símbolos debe estar entre 2 y 16.');
              }
            }}
          >
            Continuar
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  const handleCalculate = () => {
    setError('');

    const probs = symbols.map((s) => {
      if (s.prob === '' || s.prob === null) {
        return NaN;
      }
      return parseFloat(s.prob);
    });

    if (probs.some((p) => isNaN(p))) {
      setError('Todas las probabilidades deben ser números válidos y no deben estar vacías.');
      return;
    }

    const sum = probs.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 1e-6) {
      setError('La suma de probabilidades debe ser 1.');
      return;
    }

    const updatedSymbols = symbols.map((s, i) => ({
      ...s,
      prob: probs[i],
    }));

    const result = calculateHuffman(updatedSymbols);
    setHuffmanData(result);
    setSymbols(updatedSymbols);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Codificación Huffman</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Mitad izquierda: Ingreso de símbolos y resultados */}
          <div className="flex flex-col space-y-6">
            {/* Ingreso de Símbolos */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <SymbolInput
                symbols={symbols}
                setSymbols={setSymbols}
                handleCalculate={handleCalculate}
                error={error}
              />
            </div>
            {/* Resultados y Cálculos Teóricos (si existen) */}
            {huffmanData && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <Results
                  codes={huffmanData.codes}
                  entropy={huffmanData.entropy}
                  avgLength={huffmanData.avgLength}
                  efficiency={huffmanData.efficiency}
                />
              </div>
            )}
          </div>
          {/* Mitad derecha: Árbol de Huffman */}
          <div className="flex flex-col">
            <HuffmanTree treeData={huffmanData ? huffmanData.tree : null} numSymbols={numSymbols} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
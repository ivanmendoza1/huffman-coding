import React from 'react';

const SymbolInput = ({ symbols, setSymbols, handleCalculate, error }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Ingrese los Símbolos</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="w-1/4 font-semibold text-gray-700">Mensaje</span>
          <span className="w-3/4 font-semibold text-gray-700">Probabilidad</span>
        </div>
        {symbols.map((symbol, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="text"
              value={symbol.name}
              readOnly
              className="p-3 border rounded-lg w-1/4 bg-gray-100 text-gray-700"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Probabilidad"
              value={symbol.prob}
              onChange={(e) => {
                const newSymbols = [...symbols];
                newSymbols[index].prob = e.target.value;
                setSymbols(newSymbols);
              }}
              className="p-3 border rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
      >
        Calcular
      </button>
    </div>
  );
};

export default SymbolInput;
import React from 'react';

const Results = ({ codes, entropy, avgLength, efficiency }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Resultados</h2>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">Símbolo</th>
            <th className="border p-3">Probabilidad</th>
            <th className="border p-3">Código</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code, index) => {
            const prob = parseFloat(code.prob);
            const formattedProb = isNaN(prob) ? '0.000' : prob.toFixed(3);
            return (
              <tr key={index}>
                <td className="border p-3">{code.name}</td>
                <td className="border p-3">{formattedProb}</td>
                <td className="border p-3">{code.code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Entropía de la Fuente (H):</label>
          <input
            type="text"
            value={entropy.toFixed(3)}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Longitud Promedio del Código (L):</label>
          <input
            type="text"
            value={avgLength.toFixed(3)}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Eficiencia del Código (E):</label>
          <input
            type="text"
            value={(efficiency * 100).toFixed(2) + '%'}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
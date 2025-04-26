import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';

const HuffmanTree = ({ treeData, numSymbols }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = [];
    const edges = [];

    if (!treeData) {
      // Árbol inicial vacío adaptado al número de símbolos
      let internalId = numSymbols;
      for (let i = 0; i < numSymbols; i++) {
        nodes.push({ id: i, label: `X${i + 1}\n(-)` });
      }
      for (let i = 0; i < numSymbols - 1; i++) {
        nodes.push({ id: internalId, label: `N${internalId}\n(-)` });
        if (i < numSymbols - 1) {
          edges.push({ from: internalId, to: i, label: '1' });
          edges.push({ from: internalId, to: i + 1, label: '0' });
        }
        internalId++;
      }
      for (let i = numSymbols; i < internalId - 1; i++) {
        edges.push({ from: i + 1, to: i, label: '1' });
      }
    } else {
    
      const addNode = (node, parentId = null, direction = null) => {
        nodes.push({
          id: node.id,
          label: `${node.label}\n(${node.prob.toFixed(3)})`,
        });
        if (parentId !== null) {
          edges.push({ from: parentId, to: node.id, label: direction });
        }
        if (node.left) addNode(node.left, node.id, '1');
        if (node.right) addNode(node.right, node.id, '0');
      };
      addNode(treeData);
    }

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 150,
          levelSeparation: 100, 
        },
      },
      nodes: {
        shape: 'circle',
        size: 25, 
        font: {
          size: 14,
          multi: 'html',
        },
        color: {
          background: '#e3f2fd',
          border: '#2196f3',
        },
      },
      edges: {
        font: { align: 'middle', size: 12 },
        color: '#2196f3',
        width: 2, 
      },
    };

    const network = new Network(containerRef.current, data, options);

    return () => network.destroy();
  }, [treeData, numSymbols]);

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Árbol de Huffman</h2>
      <div ref={containerRef} className="w-full h-[600px] border rounded-lg bg-gray-50" />
    </div>
  );
};

export default HuffmanTree;

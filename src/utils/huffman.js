export const calculateHuffman = (symbols) => {
  const n = symbols.length;
  const probs = symbols.map((s) => parseFloat(s.prob) || 0);

  const HT = Array(2 * n - 1)
    .fill()
    .map(() => ({ prob: 0, parent: 0, left: 0, right: 0 }));
  for (let i = 0; i < n; i++) {
    HT[i].prob = probs[i];
  }
  let HT0 = HT.map((node) => ({ ...node }));

  let internalId = n;
  for (let i = 0; i < n - 1; i++) {
    const probs = HT0.map((node) => node.prob);
    const sortedIndices = probs
      .map((prob, idx) => ({ prob, idx }))
      .sort((a, b) => b.prob - a.prob)
      .map((item) => item.idx);

    const leftIdx = sortedIndices[n - i - 1];
    const rightIdx = sortedIndices[n - i - 2];
    const sum = HT0[leftIdx].prob + HT0[rightIdx].prob;

    HT0[internalId].prob = sum;
    HT0[leftIdx].prob = 0;
    HT0[rightIdx].prob = 0;

    HT0[leftIdx].parent = internalId;
    HT0[rightIdx].parent = internalId;
    HT0[internalId].left = leftIdx;
    HT0[internalId].right = rightIdx;

    HT[internalId].prob = sum;
    HT[leftIdx].parent = internalId;
    HT[rightIdx].parent = internalId;
    HT[internalId].left = leftIdx;
    HT[internalId].right = rightIdx;

    internalId++;
  }

  const codes = Array(n).fill('');
  for (let i = 0; i < n; i++) {
    let f = i;
    while (HT[f].parent !== 0) {
      const parent = HT[f].parent;
      if (HT[parent].left === f) {
        codes[i] = '1' + codes[i];
      } else {
        codes[i] = '0' + codes[i];
      }
      f = parent;
    }
  }

  const tree = {
    id: internalId - 1,
    label: 'Root',
    prob: HT[internalId - 1].prob,
    left: HT[internalId - 1].left !== 0 ? buildTreeNode(HT, HT[internalId - 1].left, symbols) : null,
    right: HT[internalId - 1].right !== 0 ? buildTreeNode(HT, HT[internalId - 1].right, symbols) : null,
  };

  let avgLength = 0;
  for (let i = 0; i < n; i++) {
    avgLength += codes[i].length * probs[i];
  }

  let entropy = 0;
  for (let i = 0; i < n; i++) {
    if (probs[i] > 0) {
      entropy -= probs[i] * Math.log2(probs[i]);
    }
  }

  const efficiency = entropy / avgLength;

  return {
    tree,
    codes: symbols.map((s, i) => ({
      name: s.name,
      prob: parseFloat(s.prob) || 0,
      code: codes[i],
    })),
    entropy,
    avgLength,
    efficiency,
  };
};

const buildTreeNode = (HT, index, symbols) => {
  if (index < symbols.length) {
    return {
      id: index,
      label: symbols[index].name,
      prob: parseFloat(symbols[index].prob) || 0,
    };
  }
  return {
    id: index,
    label: `N${index}`,
    prob: HT[index].prob,
    left: HT[index].left !== 0 ? buildTreeNode(HT, HT[index].left, symbols) : null,
    right: HT[index].right !== 0 ? buildTreeNode(HT, HT[index].right, symbols) : null,
  };
};
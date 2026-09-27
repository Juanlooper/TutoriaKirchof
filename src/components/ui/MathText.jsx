import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export const MathInline = ({ math }) => (
  <span className="math-text text-accent" style={{ padding: '0 4px' }}>
    <InlineMath math={math} />
  </span>
);

export const MathBlock = ({ math }) => {
  // Break long derivations at their existing logical separators.
  const multiline = /\\quad|\\Rightarrow/.test(math);
  const readable = multiline
    ? `\\begin{gathered}${math.replaceAll('\\quad', '\\\\').replaceAll('\\Rightarrow', '\\\\\\Rightarrow')}\\end{gathered}`
    : math;
  return <div className="glass-panel math-block"><BlockMath math={readable} /></div>;
};

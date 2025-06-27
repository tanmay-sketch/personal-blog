import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { ReactNode } from 'react';

interface MathProps {
  children: ReactNode;
}

export function Math({ children }: MathProps) {
  const mathText = String(children).trim();
  try {
    return <InlineMath math={mathText} />;
  } catch (error) {
    console.error('Math rendering error:', error);
    return <code>{mathText}</code>;
  }
}

export function MathBlock({ children }: MathProps) {
  const mathText = String(children).trim();
  try {
    return <BlockMath math={mathText} />;
  } catch (error) {
    console.error('Math rendering error:', error);
    return <pre><code>{mathText}</code></pre>;
  }
} 
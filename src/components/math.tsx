import { BlockMath, InlineMath } from 'react-katex';

interface MathProps {
  children: string;
}

export function Math({ children }: MathProps) {
  return <InlineMath math={children} />;
}

export function MathBlock({ children }: MathProps) {
  return <BlockMath math={children} />;
} 
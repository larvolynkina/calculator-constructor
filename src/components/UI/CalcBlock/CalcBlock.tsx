import React from 'react';
import './CalcBlock.scss';

interface CalcBlockProps {
  children: React.ReactNode;
}

function CalcBlock({ children }: CalcBlockProps) {
  return <div className="calc-block">{children}</div>;
}

export default CalcBlock;

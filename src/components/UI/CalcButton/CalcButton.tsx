import React from 'react';
import './CalcButton.scss';

interface CalcButtonProps {
  children: string;
  className?: string;
  onClick: (children: string) => void;
}

function CalcButton({ children, className, onClick }: CalcButtonProps) {
  return (
    <button onClick={() => onClick(children)} className={className} type="button">
      {children}
    </button>
  );
}

CalcButton.defaultProps = {
  className: 'calc-button',
};

export default CalcButton;

import React from 'react';
import './CalcButton.scss';

interface CalcButtonProps {
  children: React.ReactNode;
  className?: string;
}

function CalcButton({ children, className }: CalcButtonProps) {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}

CalcButton.defaultProps = {
  className: 'calc-button',
};

export default CalcButton;

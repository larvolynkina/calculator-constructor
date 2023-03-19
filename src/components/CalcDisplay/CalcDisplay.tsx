import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import './CalcDisplay.scss';

function CalcDisplay() {
  const displayValue = useAppSelector((state) => state.app.displayValue);
  const [value, setValue] = useState('0');

  useEffect(() => {
    if (displayValue) {
      if (displayValue.startsWith('0') && displayValue.length > 1 && displayValue[1] !== ',') {
        setValue(displayValue.slice(1));
      } else {
        setValue(displayValue);
      }
    }
  }, [displayValue]);

  return (
    <div
      className={cn('display', {
        'display--calc': displayValue && displayValue.length <= 12,
        'display--calc-mini': displayValue.length > 12 && displayValue.length <= 18,
        'display--calc-mini15px': displayValue.includes('e') || displayValue.length > 18,
      })}
    >
      {value}
    </div>
  );
}

export default CalcDisplay;

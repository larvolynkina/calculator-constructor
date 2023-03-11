import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import './CalcDisplay.scss';

function CalcDisplay() {
  const displayValue = useAppSelector((state) => state.app.displayValue);
  const [value, setValue] = useState('0');
  const [className, setClassName] = useState('display');

  useEffect(() => {
    if (displayValue) {
      if (displayValue.startsWith('0') && displayValue.length > 1 && displayValue[1] !== ',') {
        setValue(displayValue.slice(1));
      } else {
        setValue(displayValue);
      }
      if (displayValue.length > 12) {
        if (displayValue.includes('e') || displayValue.length > 18) {
          setClassName('display display--calc-mini15px');
        } else {
          setClassName('display display--calc-mini');
        }
      } else {
        setClassName('display display--calc');
      }
    } else {
      setClassName('display');
    }
  }, [displayValue]);

  return <div className={className}>{value}</div>;
}

export default CalcDisplay;

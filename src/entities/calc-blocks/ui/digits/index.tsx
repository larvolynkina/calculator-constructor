import React from 'react';
import Button from 'shared/ui/button';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import './index.scss';
import { calcModel } from 'entities/calc-blocks';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

function Digits() {
  const { displayValue, currentValue } = useAppSelector(calcModel.selectState);
  const dispatch = useAppDispatch();

  function handleDigitsClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    calcModel.processDigitInput(event, currentValue, displayValue, dispatch);
  }

  return (
    <div className="digits">
      {digits.map((item) => (
        <Button
          textContent={item}
          modifier={item === '0' ? 'zero' : ''}
          key={item}
          onClick={(event) => handleDigitsClick(event)}
        />
      ))}
    </div>
  );
}

export default Digits;

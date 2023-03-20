import React from 'react';
import Button from 'shared/ui/button';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';
import './CalcDigits.scss';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

function CalcDigits() {
  const { displayValue: currentDisplayValue, currentValue } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();
  const { updateDisplayValue, updateCurrentValue } = calcModel;

  function handleDigitsClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = event.target;
    if (button instanceof HTMLButtonElement) {
      const text = button.textContent;
      if (!currentValue) {
        if (currentDisplayValue.length === 16) {
          dispatch(updateDisplayValue(currentDisplayValue));
        } else if (text === ',' && currentDisplayValue === '') {
          dispatch(updateDisplayValue('0,'));
        } else {
          dispatch(updateDisplayValue(currentDisplayValue + text));
        }
      } else {
        if (text === ',' && currentValue) {
          dispatch(updateDisplayValue('0,'));
        } else {
          dispatch(updateDisplayValue(text));
        }
        dispatch(updateCurrentValue(null));
      }
    }
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

export default CalcDigits;

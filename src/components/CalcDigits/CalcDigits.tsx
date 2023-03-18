import React from 'react';
import Button from 'shared/ui/button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateDisplayValue, updateCurrentValue } from '../../store/reducers/appSlice';
import './CalcDigits.scss';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

function CalcDigits() {
  const { displayValue: currentDisplayValue, currentValue } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

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
          onClick={(event) => handleDigitsClick(event)}
          key={item}
          className={item === '0' ? 'button digits__zero' : 'button'}
          textContent={item}
        />
      ))}
    </div>
  );
}

export default CalcDigits;

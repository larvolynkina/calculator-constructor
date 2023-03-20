import React from 'react';
import Button from 'shared/ui/button';
import './CalcOperations.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';
import {
  replaceCommaWithDot,
  replaceDotWithComma,
  calculateResultWithFirstOperand,
} from 'utils';

const operations = ['/', 'x', '-', '+'];

function CalcOperations() {
  const {
    displayValue: currentDisplayValue,
    firstOperand,
    secondOperand,
    currentValue,
    operator,
  } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();
  
  const {
    updateFirtsOperand,
    updateOperator,
    updateCurrentValue,
    updateDisplayValue,
    updateSecondOperand,
  } = calcModel;

  function handleOperationsClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = event.target;
    if (button instanceof HTMLButtonElement) {
      const text = button.textContent;
      dispatch(updateOperator(text));
      if (!firstOperand && !secondOperand) {
        if (currentDisplayValue !== 'Не определено') {
          dispatch(updateFirtsOperand(+replaceCommaWithDot(currentDisplayValue)));
          dispatch(updateCurrentValue(currentDisplayValue));
        }
      } else if (firstOperand && currentValue) {
        dispatch(updateOperator(text));
      } else if (firstOperand && !secondOperand && !currentValue) {
        const { result, roundedResult } = calculateResultWithFirstOperand(
          firstOperand,
          currentDisplayValue,
          operator,
        );

        dispatch(updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
        if (result === 'Не определено') {
          dispatch(updateFirtsOperand(null));
        } else {
          dispatch(updateFirtsOperand(roundedResult));
        }
        dispatch(updateCurrentValue(roundedResult.toString()));
      } else if (!firstOperand && secondOperand) {
        dispatch(updateOperator(text));
        dispatch(updateFirtsOperand(+replaceCommaWithDot(currentDisplayValue)));
        dispatch(updateSecondOperand(null));
        dispatch(updateCurrentValue(currentDisplayValue));
      }
    }
  }

  return (
    <div className="operations">
      {operations.map((item) => (
        <Button onClick={(event) => handleOperationsClick(event)} key={item} textContent={item} />
      ))}
    </div>
  );
}

export default CalcOperations;

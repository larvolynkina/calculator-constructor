import Button from 'shared/ui/button';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import {
  replaceCommaWithDot,
  replaceDotWithComma,
  calculateResultWithFirstOperand,
  roundResult,
} from 'utils';
import { calcModel } from 'entities/calc-blocks';

function CalcEqual() {
  const {
    displayValue: currentDisplayValue,
    firstOperand,
    secondOperand,
    operator,
  } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();

  const { updateDisplayValue, updateSecondOperand, updateFirtsOperand, updateCurrentValue } =
    calcModel;

  function handleClick() {
    if (firstOperand && !secondOperand) {
      dispatch(updateSecondOperand(+replaceCommaWithDot(currentDisplayValue)));

      const { result, roundedResult } = calculateResultWithFirstOperand(
        firstOperand,
        currentDisplayValue,
        operator,
      );

      if (result === 'Не определено') {
        dispatch(updateSecondOperand(null));
      }

      dispatch(updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
      dispatch(updateFirtsOperand(null));
      dispatch(updateCurrentValue(roundedResult.toString()));
    } else if (secondOperand) {
      let result: number | string = 0;
      const currentValueToNumber = +replaceCommaWithDot(currentDisplayValue);
      const secondOperandToNumber = +replaceCommaWithDot(secondOperand.toString());
      if (operator === '+') {
        result = currentValueToNumber + secondOperandToNumber;
      }
      if (operator === '-') {
        result = currentValueToNumber - secondOperandToNumber;
      }
      if (operator === 'x') {
        result = currentValueToNumber * secondOperandToNumber;
      }
      if (operator === '/') {
        if (secondOperandToNumber === 0) {
          result = 'Не определено';
        } else {
          result = currentValueToNumber / secondOperandToNumber;
        }
      }
      const roundedResult = roundResult(result);
      dispatch(updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
      dispatch(updateCurrentValue(roundedResult.toString()));
    }
  }

  return (
    <div className="equal">
      <Button modifier="equal" onClick={() => handleClick()} textContent="=" />
    </div>
  );
}

export default CalcEqual;

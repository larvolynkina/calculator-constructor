import './CalcEqual.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateDisplayValue,
  updateSecondOperand,
  updateFirtsOperand,
  updateCurrentValue,
} from '../../store/reducers/appSlice';
import {
  replaceCommaWithDot,
  replaceDotWithComma,
  calculateResultWithFirstOperand,
  roundResult,
} from '../../utils';

function CalcEqual() {
  const dispatch = useAppDispatch();
  const currentDisplayValue = useAppSelector((state) => state.app.displayValue);
  const firstOperand = useAppSelector((state) => state.app.firstOperand);
  const secondOperand = useAppSelector((state) => state.app.secondOperand);
  const operator = useAppSelector((state) => state.app.operator);

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
    <button type="button" className="equal" onClick={handleClick}>
      =
    </button>
  );
}

export default CalcEqual;

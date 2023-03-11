import CalcButton from '../UI/CalcButton/CalcButton';
import './CalcOperations.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateFirtsOperand,
  updateOperator,
  updateCurrentValue,
  updateDisplayValue,
  updateSecondOperand,
} from '../../store/reducers/appSlice';
import {
  replaceCommaWithDot,
  replaceDotWithComma,
  calculateResultWithFirstOperand,
} from '../../utils';

const operations = ['/', 'x', '-', '+'];

function CalcOperations() {
  const {
    displayValue: currentDisplayValue,
    firstOperand,
    secondOperand,
    currentValue,
    operator,
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  function handleOperationsClick(children: string) {
    dispatch(updateOperator(children));
    if (!firstOperand && !secondOperand) {
      if (currentDisplayValue !== 'Не определено') {
        dispatch(updateFirtsOperand(+replaceCommaWithDot(currentDisplayValue)));
        dispatch(updateCurrentValue(currentDisplayValue));
      }
    } else if (firstOperand && currentValue) {
      dispatch(updateOperator(children));
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
      dispatch(updateOperator(children));
      dispatch(updateFirtsOperand(+replaceCommaWithDot(currentDisplayValue)));
      dispatch(updateSecondOperand(null));
      dispatch(updateCurrentValue(currentDisplayValue));
    }
  }

  return (
    <div className="operations">
      {operations.map((item) => (
        <CalcButton onClick={(children: string) => handleOperationsClick(children)} key={item}>
          {item}
        </CalcButton>
      ))}
    </div>
  );
}

export default CalcOperations;

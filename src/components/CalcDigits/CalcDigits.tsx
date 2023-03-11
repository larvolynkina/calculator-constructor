import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateDisplayValue, updateCurrentValue } from '../../store/reducers/appSlice';
import CalcButton from '../UI/CalcButton/CalcButton';
import './CalcDigits.scss';

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

function CalcDigits() {
  const dispatch = useAppDispatch();
  const currentDisplayValue = useAppSelector((state) => state.app.displayValue);
  const currentValue = useAppSelector((state) => state.app.currentValue);

  function handleDigitsClick(children: string) {
    if (!currentValue) {
      if (currentDisplayValue.length === 16) {
        dispatch(updateDisplayValue(currentDisplayValue));
      } else {
        dispatch(updateDisplayValue(currentDisplayValue + children));
      }
    } else {
      dispatch(updateDisplayValue(children));
      dispatch(updateCurrentValue(null));
    }
  }

  return (
    <div className="digits">
      {digits.map((item) => {
        if (item === '0') {
          return (
            <CalcButton
              onClick={(children: string) => handleDigitsClick(children)}
              key={item}
              className="calc-button digits__zero"
            >
              {item}
            </CalcButton>
          );
        }
        return (
          <CalcButton onClick={(children: string) => handleDigitsClick(children)} key={item}>
            {item}
          </CalcButton>
        );
      })}
    </div>
  );
}

export default CalcDigits;

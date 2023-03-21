import cn from 'classnames';
import { useAppSelector } from 'shared/lib/hooks/redux';
import './CalcDisplay.scss';

function CalcDisplay() {
  const displayValue = useAppSelector((state) => state.calc.displayValue);

  return (
    <div
      className={cn('display', {
        'display--calc': displayValue && displayValue.length <= 12,
        'display--calc-mini': displayValue.length > 12 && displayValue.length <= 18,
        'display--calc-mini15px': displayValue.includes('e') || displayValue.length > 18,
      })}
    >
      {displayValue}
    </div>
  );
}

export default CalcDisplay;

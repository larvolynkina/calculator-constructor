import cn from 'classnames';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';
import './index.scss';

function Display() {
  const { displayValue } = useAppSelector(calcModel.selectState);

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

export default Display;

import Button from 'shared/ui/button';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';

function Equal() {
  const calcState = useAppSelector(calcModel.selectState);
  const dispatch = useAppDispatch();

  function handleClick() {
    calcModel.processEqualInput(calcState, dispatch);
  }

  return (
    <div className="equal">
      <Button modifier="equal" onClick={() => handleClick()} textContent="=" />
    </div>
  );
}

export default Equal;

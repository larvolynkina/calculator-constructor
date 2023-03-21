import './index.scss';
import cn from 'classnames';
import { calcModel } from 'entities/calc-blocks';
import { useAppSelector, useAppDispatch } from 'shared/lib/hooks/redux';
import { ReactComponent as RuntimeIco } from './assets/icons/eye.svg';
import { ReactComponent as ConstructorIco } from './assets/icons/selector.svg';

function SwitchMode() {
  const { mode } = useAppSelector(calcModel.selectState);
  const dispatch = useAppDispatch();

  return (
    <div className="switcher">
      <div className="switcher__wrapper">
        <button
          type="button"
          className={cn('switcher__button', {
            'switcher__button--active': mode === 'calculator',
          })}
          id="calculator"
          onClick={() => dispatch(calcModel.updateMode('calculator'))}
        >
          <RuntimeIco />
          Runtime
        </button>
        <button
          type="button"
          className={cn('switcher__button', {
            'switcher__button--active': mode === 'constructor',
          })}
          id="constructor"
          onClick={() => dispatch(calcModel.updateMode('constructor'))}
        >
          <ConstructorIco />
          Constructor
        </button>
      </div>
    </div>
  );
}

export default SwitchMode;

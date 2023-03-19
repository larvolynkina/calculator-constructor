import './Switcher.scss';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateMode } from '../../store/reducers/appSlice';
import { ReactComponent as RuntimeIco } from './ui/assets/icons/eye.svg';
import { ReactComponent as ConstructorIco } from './ui/assets/icons/selector.svg';

function Switcher() {
  const mode = useAppSelector((state) => state.app.mode);
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
          onClick={() => dispatch(updateMode('calculator'))}
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
          onClick={() => dispatch(updateMode('constructor'))}
        >
          <ConstructorIco />
          Constructor
        </button>
      </div>
    </div>
  );
}

export default Switcher;

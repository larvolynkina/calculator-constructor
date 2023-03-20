import { calcModel } from 'entities/calc-blocks';
import ConstructCalc from '../features/construct-calc';
import RunCalc from '../features/run-calc';
import { useAppSelector } from '../shared/lib/hooks/redux';
import SwitchMode from '../features/switch-mode';
import './styles/index.scss';

function App() {
  const mode = useAppSelector((state) => state.calc.mode);

  return (
    <div className="app">
      <SwitchMode />
      {mode === calcModel.Mode.build ? <ConstructCalc /> : <RunCalc />}
    </div>
  );
}

export default App;

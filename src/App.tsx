import Constructor from './views/Constructor';
import Runtime from './views/Runtime';
import { useAppSelector } from './hooks/redux';
import { Mode } from './const';
import Switcher from './components/Switcher';

function App() {
  const appMode = useAppSelector((state) => state.app.mode);

  return (
    <div className="app">
      <Switcher />
      {appMode === Mode.build ? <Constructor /> : <Runtime />}
    </div>
  );
}

export default App;

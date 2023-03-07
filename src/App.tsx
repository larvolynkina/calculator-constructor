import { useState, useEffect } from 'react';
import Constructor from './views/Constructor/Constructor';
import Runtime from './views/Runtime/Runtime';
import { useAppSelector } from './hooks/redux';
import Mode from './const';

function App() {
  const appMode = useAppSelector((state) => state.app.mode);
  const [mode, setMode] = useState<Mode>(appMode);

  useEffect(() => {
    setMode(appMode);
  }, [appMode]);

  return <div className="app">{mode === Mode.build ? <Constructor /> : <Runtime />}</div>;
}

export default App;

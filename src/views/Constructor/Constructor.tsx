import './Constructor.scss';
import CalcDisplay from '../../components/CalcDisplay';
import CalcOperations from '../../components/CalcOperations';
import CalcDigits from '../../components/CalcDigits';
import CalcEqual from '../../components/CalcEqual';
import Canvas from '../../components/Canvas';

function Constructor() {
  return (
    <div className="constructor">
      <div className="constructor__wrapper">
        <div className="constructor__blocks">
          <CalcDisplay />
          <CalcOperations />
          <CalcDigits />
          <CalcEqual />
        </div>
        <div className="constructor__canvas">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default Constructor;

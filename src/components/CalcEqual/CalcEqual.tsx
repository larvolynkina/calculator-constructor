import CalcBlock from '../UI/CalcBlock/CalcBlock';
import './CalcEqual.scss';

function CalcEqual() {
  return (
    <CalcBlock>
      <button type='button' className="equal">=</button>
    </CalcBlock>
  );
}

export default CalcEqual;

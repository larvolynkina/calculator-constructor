import './Constructor.scss';
import CalcBlock from '../../components/CalcBlock/CalcBlock';
import Canvas from '../../components/Canvas';
import { allCalcBlocks } from '../../components/Canvas/Canvas';

function Constructor() {
  return (
    <div className="constructor">
      <div className="constructor__wrapper">
        <div className="constructor__blocks">
          {allCalcBlocks.map(({ element, id }) => (
            <CalcBlock draggable id={id} key={id}>
              {element}
            </CalcBlock>
          ))}
        </div>
        <div className="constructor__canvas">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default Constructor;

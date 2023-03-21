import './index.scss';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { DraggableBlock } from 'shared/ui';
import { calcModel } from 'entities/calc-blocks';
import Canvas from './canvas';
import isCalcBlockCopied from '../lib';

function ConstructCalc() {
  const calcBlocks = useAppSelector((state) => state.calc.calcBlocks);

  return (
    <div className="constructor">
      <div className="constructor__wrapper">
        <div className="constructor__blocks">
          {calcModel.allCalcBlocks.map(({ element, id }) => (
            <DraggableBlock
              draggable={!isCalcBlockCopied(calcBlocks, id)}
              id={id}
              key={id}
              modifier={isCalcBlockCopied(calcBlocks, id) ? 'copied' : ''}
            >
              {element}
            </DraggableBlock>
          ))}
        </div>
        <div className="constructor__canvas">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default ConstructCalc;

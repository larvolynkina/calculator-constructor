import { DraggableBlock } from 'shared/ui';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { calcModel } from 'entities/calc-blocks';
import './index.scss';

function RunCalc() {
  const { calcBlocks } = useAppSelector(calcModel.selectState);

  return (
    <div className="calculator">
      <div className="calculator__blocks">
        {calcBlocks.map(({ element, id }) => (
          <DraggableBlock draggable={false} id={id} key={id}>
            {element}
          </DraggableBlock>
        ))}
      </div>
    </div>
  );
}

export default RunCalc;

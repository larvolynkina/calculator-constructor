import { DraggableBlock } from 'shared/ui';
import { useAppSelector } from 'shared/lib/hooks/redux';
import './index.scss';

function RunCalc() {
  const { calcBlocks } = useAppSelector((state) => state.calc);

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

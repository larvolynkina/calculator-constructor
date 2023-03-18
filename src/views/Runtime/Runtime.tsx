import DraggableBlock from 'shared/ui/draggableBlock';
import { useAppSelector } from '../../hooks/redux';
import './Runtime.scss';

function Runtime() {
  const { calcBlocks } = useAppSelector((state) => state.app);

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

export default Runtime;

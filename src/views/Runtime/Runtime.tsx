import CalcBlock from '../../components/CalcBlock/CalcBlock';
import { useAppSelector } from '../../hooks/redux';
import './Runtime.scss';

function Runtime() {
  const { calcBlocks } = useAppSelector((state) => state.app);

  return (
    <div className="calculator">
      <div className="calculator__blocks">
        {calcBlocks.map(({ element, id }) => (
          <CalcBlock draggable={false} id={id} key={id}>
            {element}
          </CalcBlock>
        ))}
      </div>
    </div>
  );
}

export default Runtime;

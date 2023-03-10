import { useEffect, useState } from 'react';
import CalcBlock from '../../components/CalcBlock/CalcBlock';
import { useAppSelector } from '../../hooks/redux';
import ICalcBlocks from '../../types';
import './Runtime.scss';

function Runtime() {
  const calcBlocksFromState = useAppSelector((state) => state.app.calcBlocks);
  const [calcBlocks, setCalcBlocks] = useState<ICalcBlocks[]>(calcBlocksFromState);

  useEffect(() => {
    setCalcBlocks(calcBlocksFromState);
  }, [calcBlocksFromState]);

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

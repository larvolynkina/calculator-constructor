import { ReactElement } from 'react';
import './Constructor.scss';
import CalcBlock from '../../components/UI/CalcBlock/CalcBlock';
import CalcDisplay from '../../components/CalcDisplay';
import CalcOperations from '../../components/CalcOperations';
import CalcDigits from '../../components/CalcDigits';
import CalcEqual from '../../components/CalcEqual';
import Canvas from '../../components/Canvas';

interface ICalcBlocks {
  element: ReactElement;
  id: string;
}

const calcBlocks: ICalcBlocks[] = [
  {
    element: <CalcDisplay />,
    id: 'display',
  },
  {
    element: <CalcOperations />,
    id: 'operations',
  },
  {
    element: <CalcDigits />,
    id: 'digits',
  },
  {
    element: <CalcEqual />,
    id: 'equal',
  },
];

function Constructor() {
  return (
    <div className="constructor">
      <div className="constructor__wrapper">
        <div className="constructor__blocks">
          {calcBlocks.map(({ element, id }) => (
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

import './Constructor.scss';
import DraggableBlock from 'shared/ui/draggableBlock';
import Canvas from '../../components/Canvas';
import CalcDisplay from '../../components/CalcDisplay';
import CalcDigits from '../../components/CalcDigits';
import CalcEqual from '../../components/CalcEqual';
import CalcOperations from '../../components/CalcOperations';
import ICalcBlocks from '../../types';

export const allCalcBlocks: ICalcBlocks[] = [
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
          {allCalcBlocks.map(({ element, id }) => (
            <DraggableBlock draggable id={id} key={id}>
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

export default Constructor;

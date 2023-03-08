import React, { useState, ReactElement, useEffect } from 'react';
import CalcBlock from '../UI/CalcBlock/CalcBlock';
import CalcOperations from '../CalcOperations';
import CalcEqual from '../CalcEqual';
import CalcDigits from '../CalcDigits';
import CalcDisplay from '../CalcDisplay';
import './Canvas.scss';
import CanvasPrompt from './CanvasPrompt';

interface ICalcBlocks {
  element: ReactElement;
  id: string;
}

function Canvas() {
  const [calcBlocks, setCalcBlocks] = useState<ICalcBlocks[]>([]);
  const [className, setClassName] = useState('canvas');

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!calcBlocks.length) {
      if (className !== 'canvas canvas--drag-over') {
        setClassName('canvas canvas--drag-over');
      }
    }
  }

  function handleDragLeave() {
    if (calcBlocks.length) {
      setClassName('canvas canvas--with-blocks');
    } else {
      setClassName('canvas');
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const id = event.dataTransfer.getData('id');
    switch (id) {
      case 'display':
        setCalcBlocks([{ element: <CalcDisplay />, id: 'display-canvas' }, ...calcBlocks]);
        break;
      case 'digits':
        setCalcBlocks([...calcBlocks, { element: <CalcDigits />, id: 'digits-canvas' }]);
        break;
      case 'operations':
        setCalcBlocks([...calcBlocks, { element: <CalcOperations />, id: 'operations-canvas' }]);
        break;
      case 'equal':
        setCalcBlocks([...calcBlocks, { element: <CalcEqual />, id: 'equal-canvas' }]);
        break;
      default:
    }
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLElement;
    if (target) {
      const filteredArray = [...calcBlocks].filter(
        (item) =>
          !item.id.startsWith(target.className) &&
          !item.id.startsWith(target.closest('div')?.className || ''),
      );
      setCalcBlocks(filteredArray);
    }
  }

  useEffect(() => {
    if (calcBlocks.length) {
      setClassName('canvas canvas--with-blocks');
    }
  }, [calcBlocks]);

  return (
    <div
      className={className}
      onDoubleClick={handleDoubleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      {calcBlocks.length ? (
        calcBlocks.map(({ element, id }) => (
          <CalcBlock draggable id={id} key={id}>
            {element}
          </CalcBlock>
        ))
      ) : (
        <CanvasPrompt />
      )}
    </div>
  );
}

export default Canvas;

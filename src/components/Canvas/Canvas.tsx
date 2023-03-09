import React, { useState, useEffect } from 'react';
import CalcBlock from '../UI/CalcBlock/CalcBlock';
import CalcOperations from '../CalcOperations';
import CalcEqual from '../CalcEqual';
import CalcDigits from '../CalcDigits';
import CalcDisplay from '../CalcDisplay';
import './Canvas.scss';
import CanvasPrompt from './CanvasPrompt';
import ICalcBlocks from '../../types';
import { updateCalcBlocks } from '../../store/reducers/appSlice';
import { useAppDispatch } from '../../hooks/redux';

const allCalcBlocks: ICalcBlocks[] = [
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

function Canvas() {
  const [calcBlocks, setCalcBlocks] = useState<ICalcBlocks[]>([]);
  const [className, setClassName] = useState('canvas');
  const dispatch = useAppDispatch();

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!calcBlocks.length) {
      if (className !== 'canvas canvas--drag-over') {
        setClassName('canvas canvas--drag-over');
      }
    }
    const target = event.target as HTMLElement;
    const targetParams = target.getBoundingClientRect();
    const targetCenter = targetParams.y + targetParams.height / 2;

    if (target.id.includes('canvas')) {
      if (event.clientY > targetCenter) {
        target.className = 'calc-block calc-block--after';
      } else if (target.id !== 'display-canvas') {
        target.className = 'calc-block calc-block--before';
      }
    }

    if (target.className.includes('canvas--with-blocks') && calcBlocks.length) {
      const lastChild = Array.from(target.children).at(-1);
      if (lastChild) {
        lastChild.className = 'calc-block calc-block--after';
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
    const target = event.target as HTMLElement;
    const targetParams = target.getBoundingClientRect();
    const targetCenter = targetParams.y + targetParams.height / 2;

    if (id === 'display') {
      setCalcBlocks([{ element: <CalcDisplay />, id: 'display-canvas' }, ...calcBlocks]);
      dispatch(
        updateCalcBlocks([{ element: <CalcDisplay />, id: 'display-canvas' }, ...calcBlocks]),
      );
    }
    if ((id === 'digits' || id === 'operations' || id === 'equal') && !calcBlocks.length) {
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      if (currentBlock) {
        setCalcBlocks([{ element: currentBlock.element, id: `${id}-canvas` }]);
        dispatch(updateCalcBlocks([{ element: currentBlock.element, id: `${id}-canvas` }]));
      }
    }
    if (
      (id === 'digits' || id === 'operations' || id === 'equal') &&
      event.clientY > targetCenter &&
      target.id.includes('canvas')
    ) {
      const calcBlocksCopy = [...calcBlocks];
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      const index = calcBlocks.findIndex((item) => item.id === target.id);
      if (currentBlock) {
        calcBlocksCopy.splice(index + 1, 0, { element: currentBlock.element, id: `${id}-canvas` });
      }
      setCalcBlocks(calcBlocksCopy);
      dispatch(updateCalcBlocks(calcBlocksCopy));
      target.className = 'calc-block';
    }
    if (
      (id === 'digits' || id === 'operations' || id === 'equal') &&
      event.clientY < targetCenter &&
      target.id.includes('canvas')
    ) {
      const calcBlocksCopy = [...calcBlocks];
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      const index = calcBlocks.findIndex((item) => item.id === target.id);
      if (currentBlock) {
        calcBlocksCopy.splice(index, 0, { element: currentBlock.element, id: `${id}-canvas` });
      }
      setCalcBlocks(calcBlocksCopy);
      dispatch(updateCalcBlocks(calcBlocksCopy));
      target.className = 'calc-block';
    }
    if (
      (id === 'digits' || id === 'operations' || id === 'equal') &&
      target.className.includes('canvas--with-blocks')
    ) {
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      if (currentBlock) {
        const lastChild = Array.from(target.children).at(-1);
        if (lastChild) {
          lastChild.className = 'calc-block';
        }
        setCalcBlocks([...calcBlocks, { element: currentBlock.element, id: `${id}-canvas` }]);
        dispatch(
          updateCalcBlocks([...calcBlocks, { element: currentBlock.element, id: `${id}-canvas` }]),
        );
      }
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
      dispatch(updateCalcBlocks(filteredArray));
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

import React, { useState, useEffect } from 'react';
import CalcBlock from '../CalcBlock/CalcBlock';
import CalcDisplay from '../CalcDisplay';
import './Canvas.scss';
import CanvasPrompt from './CanvasPrompt';
import ICalcBlocks from '../../types';
import { updateCalcBlocks } from '../../store/reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { allCalcBlocks } from '../../views/Constructor/Constructor';

function Canvas() {
  const calcBlocksFromState = useAppSelector((state) => state.app.calcBlocks);
  const [calcBlocks, setCalcBlocks] = useState<ICalcBlocks[]>(calcBlocksFromState);
  const [className, setClassName] = useState('canvas');
  const dispatch = useAppDispatch();
  const draggableElement = useAppSelector((state) => state.app.draggableElement);

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
    if (draggableElement && draggableElement.id !== target.id) {
      if (target.id.includes('canvas')) {
        if (event.clientY > targetCenter) {
          target.className = 'calc-block calc-block--after';
        } else if (target.id !== 'display-canvas') {
          target.className = 'calc-block calc-block--before';
        }
      }
    }
    if (
      target.className.includes('canvas--with-blocks') &&
      calcBlocks.length &&
      calcBlocks.length < 4
    ) {
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
      dispatch(
        updateCalcBlocks([{ element: <CalcDisplay />, id: 'display-canvas' }, ...calcBlocks]),
      );
    } else if ((id === 'digits' || id === 'operations' || id === 'equal') && !calcBlocks.length) {
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      if (currentBlock) {
        dispatch(updateCalcBlocks([{ element: currentBlock.element, id: `${id}-canvas` }]));
      }
    } else if (
      (id === 'digits' || id === 'operations' || id === 'equal') &&
      target.id.includes('canvas')
    ) {
      const calcBlocksCopy = [...calcBlocks];
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      const index = calcBlocks.findIndex((item) => item.id === target.id);
      if (currentBlock) {
        if (event.clientY > targetCenter) {
          calcBlocksCopy.splice(index + 1, 0, {
            element: currentBlock.element,
            id: `${id}-canvas`,
          });
        } else if (target.id !== 'display-canvas') {
          calcBlocksCopy.splice(index, 0, { element: currentBlock.element, id: `${id}-canvas` });
        }
      }
      dispatch(updateCalcBlocks(calcBlocksCopy));
    } else if (
      (id === 'digits' || id === 'operations' || id === 'equal') &&
      target.className.includes('canvas--with-blocks')
    ) {
      const currentBlock = allCalcBlocks.find((item) => item.id === id);
      if (currentBlock) {
        const lastChild = Array.from(target.children).at(-1);
        if (lastChild) {
          if (lastChild.id.includes('display')) {
            lastChild.className = 'calc-block calc-block--no-grab';
          } else {
            lastChild.className = 'calc-block';
          }
        }
        dispatch(
          updateCalcBlocks([...calcBlocks, { element: currentBlock.element, id: `${id}-canvas` }]),
        );
      }
    } else if (
      id.includes('canvas') &&
      id !== 'display-canvas' &&
      target.id.includes('canvas') &&
      target.id !== id
    ) {
      const targetIndex = calcBlocks.findIndex((item) => item.id === target.id);
      const draggableIndex = calcBlocks.findIndex((item) => item.id === id);
      const calcBlocksCopy = [...calcBlocks];
      const draggable = allCalcBlocks.filter((item) => id.includes(item.id));
      const targetElement = allCalcBlocks.filter((item) => target.id.includes(item.id));

      if (!target.id.includes('display')) {
        if (
          (targetIndex - draggableIndex === 1 && event.clientY > targetCenter) ||
          (draggableIndex - targetIndex === 1 && event.clientY < targetCenter)
        ) {
          calcBlocksCopy[draggableIndex] = { element: targetElement[0].element, id: target.id };
          calcBlocksCopy[targetIndex] = { element: draggable[0].element, id };
          dispatch(updateCalcBlocks(calcBlocksCopy));
        }
        if (targetIndex - draggableIndex === 2 && event.clientY < targetCenter) {
          dispatch(updateCalcBlocks([calcBlocks[2], calcBlocks[1], calcBlocks[3], calcBlocks[1]]));
        }
        if (targetIndex - draggableIndex === 2 && event.clientY > targetCenter) {
          dispatch(updateCalcBlocks([calcBlocks[0], calcBlocks[2], calcBlocks[3], calcBlocks[1]]));
        }
        if (draggableIndex - targetIndex === 2 && event.clientY < targetCenter) {
          dispatch(updateCalcBlocks([calcBlocks[0], calcBlocks[3], calcBlocks[1], calcBlocks[2]]));
        }
      } else if (draggableIndex - targetIndex === 3 && event.clientY > targetCenter) {
        dispatch(updateCalcBlocks([calcBlocks[0], calcBlocks[3], calcBlocks[1], calcBlocks[2]]));
      }
    }
    if (target.id.includes('display')) {
      target.className = 'calc-block calc-block--no-grab';
    } else if (target.id.includes('canvas')) {
      target.className = 'calc-block';
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
      dispatch(updateCalcBlocks(filteredArray));
    }
  }

  useEffect(() => {
    if (calcBlocks.length) {
      setClassName('canvas canvas--with-blocks');
    } else {
      setClassName('canvas');
    }
  }, [calcBlocks]);

  useEffect(() => {
    setCalcBlocks(calcBlocksFromState);
  }, [calcBlocksFromState]);

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

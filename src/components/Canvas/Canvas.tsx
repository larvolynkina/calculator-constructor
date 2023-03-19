import React, { useState, useEffect } from 'react';
import DraggableBlock from 'shared/ui/draggableBlock';
import CalcDisplay from '../CalcDisplay';
import './Canvas.scss';
import CanvasPrompt from './CanvasPrompt';
import { updateCalcBlocks } from '../../store/reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { allCalcBlocks } from '../../views/Constructor/Constructor';
import { handleCanvasWithBlocksDrag, handleCanvasDrop } from './handlers';

function Canvas() {
  const { calcBlocks } = useAppSelector((state) => state.app);
  const [className, setClassName] = useState(
    calcBlocks.length ? 'canvas canvas--with-blocks' : 'canvas',
  );
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
    handleCanvasWithBlocksDrag(target, 'calc-block calc-block--after', calcBlocks);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (calcBlocks.length) {
      setClassName('canvas canvas--with-blocks');
    } else {
      setClassName('canvas');
    }
    handleCanvasWithBlocksDrag(target, 'calc-block', calcBlocks);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const id = event.dataTransfer.getData('id');
    const target = event.target as HTMLElement;
    const targetParams = target.getBoundingClientRect();
    const targetCenter = targetParams.y + targetParams.height / 2;
    handleCanvasDrop(
      id,
      target,
      event,
      targetCenter,
      calcBlocks,
      <CalcDisplay />,
      allCalcBlocks,
      dispatch,
    );
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
          <DraggableBlock
            draggable={!id.includes('display')}
            id={id}
            key={id}
            modifier={id.includes('display') ? 'no-grab' : ''}
          >
            {element}
          </DraggableBlock>
        ))
      ) : (
        <CanvasPrompt />
      )}
    </div>
  );
}

export default Canvas;

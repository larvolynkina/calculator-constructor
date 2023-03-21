import React, { useState } from 'react';
import { calcModel } from 'entities/calc-blocks';
import { DraggableBlock } from 'shared/ui';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import cn from 'classnames';
import CanvasPrompt from './canvas-prompt';
import {
  toggleCanvasInsertLine,
  handleCanvasDrop,
  deleteBlockFromCanvas,
  showPlaceToInsert,
} from '../../../model';

function Canvas() {
  const { calcBlocks } = useAppSelector(calcModel.selectState);
  const [dragOver, setDragOver] = useState(false);
  const dispatch = useAppDispatch();

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // add dragover style to canvas
    if (!calcBlocks.length) {
      setDragOver(true);
    }
    showPlaceToInsert(event);
    toggleCanvasInsertLine(event, 'calc-block calc-block--after', calcBlocks);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    // remove dragover style from canvas
    if (!calcBlocks.length) {
      setDragOver(false);
    }
    toggleCanvasInsertLine(event, 'calc-block', calcBlocks);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    handleCanvasDrop(event, calcBlocks, dispatch);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    deleteBlockFromCanvas(event, calcBlocks, setDragOver, dispatch);
  }

  return (
    <div
      className={cn('canvas', {
        'canvas--with-blocks': calcBlocks.length,
        'canvas--drag-over': dragOver && !calcBlocks.length,
      })}
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

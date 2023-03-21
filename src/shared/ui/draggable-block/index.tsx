/* eslint-disable no-param-reassign */
import React, { PropsWithChildren } from 'react';
import './index.scss';
import cn from 'classnames';

interface DraggableBlockProps {
  draggable: boolean;
  id: string;
  modifier?: string;
}

function DraggableBlock({
  children,
  draggable,
  id,
  modifier,
}: PropsWithChildren<DraggableBlockProps>) {
  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('id', id);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.id.includes('canvas')) {
      if (!target.id.includes('display')) {
        target.className = 'calc-block';
      } else {
        target.className = 'calc-block calc-block--no-grab';
      }
    }
  }

  return (
    <div
      className={cn('calc-block', {
        [`calc-block--${modifier}`]: modifier,
      })}
      draggable={draggable}
      id={id}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
    >
      {children}
    </div>
  );
}

export default DraggableBlock;

DraggableBlock.defaultProps = {
  modifier: '',
};

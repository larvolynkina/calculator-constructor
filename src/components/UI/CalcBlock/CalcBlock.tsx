/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import './CalcBlock.scss';

interface CalcBlockProps {
  children: React.ReactNode;
  draggable: boolean;
  id: string;
}

function CalcBlock({ children, draggable, id }: CalcBlockProps) {
  const [className, setClassName] = useState('calc-block');
  const [isDraggable, setIsDraggable] = useState(draggable);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('id', id);
    event.dataTransfer.effectAllowed = 'copy';
  }

  function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
    if (event.dataTransfer.dropEffect === 'copy') {
      setClassName('calc-block calc-block--copied');
      setIsDraggable(false);
    }
  }

  return (
    <div
      draggable={isDraggable}
      id={id}
      className={className}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
}

export default CalcBlock;

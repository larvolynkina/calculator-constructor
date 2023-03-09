/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import './CalcBlock.scss';
import { useAppSelector } from '../../../hooks/redux';

interface CalcBlockProps {
  children: React.ReactNode;
  draggable: boolean;
  id: string;
}

function CalcBlock({ children, draggable, id }: CalcBlockProps) {
  const [className, setClassName] = useState('calc-block');
  const [isDraggable, setIsDraggable] = useState(draggable);
  const calcBlocks = useAppSelector((state) => state.app.calcBlocks);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (!target.id.includes('canvas')) {
      event.dataTransfer.effectAllowed = 'copy';
    } else {
      event.dataTransfer.effectAllowed = 'move';
    }
    event.dataTransfer.setData('id', id);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.id.includes('canvas')) {
      target.className = 'calc-block';
    }
  }

  useEffect(() => {
    const current = calcBlocks.filter((item) => item.id.includes(id));
    if (id === 'display-canvas') {
      setClassName('calc-block calc-block--no-grab');
      setIsDraggable(false);
    }
    if (!id.includes('canvas')) {
      if (current.length > 0) {
        setClassName('calc-block calc-block--copied');
        setIsDraggable(false);
      } else {
        setClassName('calc-block');
        setIsDraggable(true);
      }
    }
  }, [calcBlocks]);

  return (
    <div
      draggable={isDraggable}
      id={id}
      className={className}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
    >
      {children}
    </div>
  );
}

export default CalcBlock;

/* eslint-disable no-param-reassign */
import React, { useState, useEffect, PropsWithChildren } from 'react';
import './draggableBlock.scss';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { updateDraggbleElement } from '../../../store/reducers/appSlice';

interface DraggableBlockProps {
  draggable: boolean;
  id: string;
}

function DraggableBlock({ children, draggable, id }: PropsWithChildren<DraggableBlockProps>) {
  const [className, setClassName] = useState('calc-block');
  const [isDraggable, setIsDraggable] = useState(draggable);
  const calcBlocks = useAppSelector((state) => state.app.calcBlocks);
  const dispatch = useAppDispatch();

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (!target.id.includes('canvas')) {
      event.dataTransfer.effectAllowed = 'copy';
    } else {
      event.dataTransfer.effectAllowed = 'move';
    }
    dispatch(updateDraggbleElement(target));
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

  useEffect(() => {
    const current = calcBlocks.filter((item) => item.id.includes(id));
    if (id === 'display-canvas') {
      setClassName('calc-block calc-block--no-grab');
      setIsDraggable(false);
    } else {
      setClassName('calc-block');
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

export default DraggableBlock;

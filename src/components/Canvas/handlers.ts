import React, { ReactElement } from 'react';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import ICalcBlocks from '../../types';
import { updateCalcBlocks, TinitialState } from '../../store/reducers/appSlice';

type TDispatch = ThunkDispatch<
  {
    app: TinitialState;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction>;

export function handleCanvasWithBlocksDrag(
  target: HTMLElement,
  childclassName: string,
  calcBlocks: ICalcBlocks[],
) {
  if (
    target.className.includes('canvas--with-blocks') &&
    calcBlocks.length &&
    calcBlocks.length < 4
  ) {
    const lastChild = Array.from(target.children).at(-1);
    if (lastChild) {
      lastChild.className = childclassName;
    }
  }
}

export function handleCanvasDrop(
  id: string,
  target: HTMLElement,
  event: React.DragEvent<HTMLDivElement>,
  targetCenter: number,
  calcBlocks: ICalcBlocks[],
  element: ReactElement,
  allCalcBlocks: ICalcBlocks[],
  dispatch: TDispatch,
) {
  if (id === 'display') {
    dispatch(updateCalcBlocks([{ element, id: 'display-canvas' }, ...calcBlocks]));
    handleCanvasWithBlocksDrag(target, 'calc-block', calcBlocks);
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
}

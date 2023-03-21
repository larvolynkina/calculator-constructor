/* eslint-disable no-undef */
import React, { ReactElement } from 'react';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { calcModel, ICalcBlock } from 'entities/calc-blocks';

// type TDispatch = ThunkDispatch<
//   {
//     calc: TinitialState;
//   },
//   undefined,
//   AnyAction
// > &
//   Dispatch<AnyAction>;

export function handleCanvasWithBlocksDrag(
  target: HTMLElement,
  childclassName: string,
  calcBlocks: ICalcBlock[],
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
  calcBlocks: ICalcBlock[],
  element: ReactElement,
  allCalcBlocks: ICalcBlock[],
  dispatch: AppDispatch,
) {
  if (id === 'display') {
    dispatch(calcModel.updateCalcBlocks([{ element, id: 'display-canvas' }, ...calcBlocks]));
    handleCanvasWithBlocksDrag(target, 'calc-block', calcBlocks);
  } else if ((id === 'digits' || id === 'operations' || id === 'equal') && !calcBlocks.length) {
    const currentBlock = allCalcBlocks.find((item) => item.id === id);
    if (currentBlock) {
      dispatch(calcModel.updateCalcBlocks([{ element: currentBlock.element, id: `${id}-canvas` }]));
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
    dispatch(calcModel.updateCalcBlocks(calcBlocksCopy));
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
        calcModel.updateCalcBlocks([...calcBlocks, { element: currentBlock.element, id: `${id}-canvas` }]),
      );
    }
  } else if (
    id.includes('canvas') &&
    id !== 'display-canvas' &&
    (target.id.includes('canvas') || target.className.includes('canvas--with-blocks')) &&
    target.id !== id
  ) {
    const targetIndex = calcBlocks.findIndex((item) => item.id === target.id);
    const draggableIndex = calcBlocks.findIndex((item) => item.id === id);
    const calcBlocksCopy = [...calcBlocks];
    const draggable = calcBlocks.filter((item) => id.includes(item.id));

    calcBlocksCopy.splice(draggableIndex, 1);
    if (target.className.includes('canvas--with-blocks')) {
      calcBlocksCopy.push(draggable[0]);
      dispatch(calcModel.updateCalcBlocks(calcBlocksCopy));
      handleCanvasWithBlocksDrag(target, 'calc-block', calcBlocks);
    }
    if (
      (!target.id.includes('display') || event.clientY > targetCenter) &&
      !target.className.includes('canvas--with-blocks')
    ) {
      if (event.clientY > targetCenter && draggableIndex > targetIndex) {
        calcBlocksCopy.splice(targetIndex + 1, 0, draggable[0]);
      }
      if (event.clientY > targetCenter && draggableIndex < targetIndex) {
        calcBlocksCopy.splice(targetIndex, 0, draggable[0]);
      }
      if (event.clientY < targetCenter && draggableIndex > targetIndex) {
        calcBlocksCopy.splice(targetIndex, 0, draggable[0]);
      }
      if (event.clientY < targetCenter && draggableIndex < targetIndex) {
        calcBlocksCopy.splice(targetIndex - 1, 0, draggable[0]);
      }
      dispatch(calcModel.updateCalcBlocks(calcBlocksCopy));
    }
  }
}

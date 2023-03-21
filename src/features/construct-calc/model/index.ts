/* eslint-disable no-undef */
import React from 'react';
import { calcModel, ICalcBlock } from 'entities/calc-blocks';

export function toggleCanvasInsertLine(
  event: React.DragEvent<HTMLDivElement>,
  childclassName: string,
  calcBlocks: ICalcBlock[],
) {
  const target = event.target as HTMLElement;
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
  event: React.DragEvent<HTMLDivElement>,
  calcBlocks: ICalcBlock[],
  dispatch: AppDispatch,
) {
  const id = event.dataTransfer.getData('id');
  const target = event.target as HTMLElement;
  const targetParams = target.getBoundingClientRect();
  const targetCenter = targetParams.y + targetParams.height / 2;

  if (!id.includes('canvas')) {
    const currentBlock = calcModel.allCalcBlocks.find((item) => item.id === id);
    if (currentBlock) {
      if (id === 'display') {
        dispatch(
          calcModel.updateCalcBlocks([
            { element: currentBlock.element, id: 'display-canvas' },
            ...calcBlocks,
          ]),
        );
        toggleCanvasInsertLine(event, 'calc-block', calcBlocks);
      } else if ((id === 'digits' || id === 'operations' || id === 'equal') && !calcBlocks.length) {
        dispatch(
          calcModel.updateCalcBlocks([{ element: currentBlock.element, id: `${id}-canvas` }]),
        );
      } else if (
        (id === 'digits' || id === 'operations' || id === 'equal') &&
        target.id.includes('canvas')
      ) {
        const calcBlocksCopy = [...calcBlocks];
        const index = calcBlocks.findIndex((item) => item.id === target.id);

        if (event.clientY > targetCenter) {
          calcBlocksCopy.splice(index + 1, 0, {
            element: currentBlock.element,
            id: `${id}-canvas`,
          });
        } else if (target.id !== 'display-canvas') {
          calcBlocksCopy.splice(index, 0, { element: currentBlock.element, id: `${id}-canvas` });
        }
        dispatch(calcModel.updateCalcBlocks(calcBlocksCopy));
      } else if (
        (id === 'digits' || id === 'operations' || id === 'equal') &&
        target.className.includes('canvas--with-blocks')
      ) {
        const lastChild = Array.from(target.children).at(-1);
        if (lastChild) {
          if (lastChild.id.includes('display')) {
            lastChild.className = 'calc-block calc-block--no-grab';
          } else {
            lastChild.className = 'calc-block';
          }
        }
        dispatch(
          calcModel.updateCalcBlocks([
            ...calcBlocks,
            { element: currentBlock.element, id: `${id}-canvas` },
          ]),
        );
      }
    }
  } else if (
    (target.id.includes('canvas') || target.className.includes('canvas')) &&
    id !== 'display-canvas' &&
    !target.className.includes('display') &&
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
      toggleCanvasInsertLine(event, 'calc-block', calcBlocks);
    } else if (!target.id.includes('display') || event.clientY > targetCenter) {
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
  // remove insert line
  if (target.id.includes('canvas')) {
    if (target.id.includes('display')) {
      target.className = 'calc-block calc-block--no-grab';
    } else {
      target.className = 'calc-block';
    }
  }
}

export function deleteBlockFromCanvas(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  calcBlocks: ICalcBlock[],
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
) {
  const target = event.target as HTMLElement;
  if (target) {
    const filteredArray = [...calcBlocks].filter(
      (item) =>
        !target.className.includes(item.id.split('-')[0]) &&
        !item.id.startsWith(target.className) &&
        !item.id.startsWith(target.closest('div')?.className || ''),
    );
    if (!filteredArray.length) {
      setDragOver(false);
    }
    dispatch(calcModel.updateCalcBlocks(filteredArray));
  }
}

export function showPlaceToInsert(event: React.DragEvent<HTMLDivElement>) {
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
}

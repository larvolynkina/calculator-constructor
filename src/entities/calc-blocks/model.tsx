/* eslint-disable no-undef */
import React, { ReactElement } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { MAX_DISPLAY_VALUE_LENGTH } from 'shared/config';
import {
  replaceCommaWithDot,
  replaceDotWithComma,
  calculateResultWithFirstOperand,
  roundResult,
} from 'entities/calc-blocks/lib';
import { CalcBlocks } from '.';

export enum Mode {
  calc = 'calculator',
  build = 'constructor',
}

export interface ICalcBlock {
  element: ReactElement;
  id: string;
}

export const allCalcBlocks: ICalcBlock[] = [
  {
    element: <CalcBlocks.Display />,
    id: 'display',
  },
  {
    element: <CalcBlocks.Operations />,
    id: 'operations',
  },
  {
    element: <CalcBlocks.Digits />,
    id: 'digits',
  },
  {
    element: <CalcBlocks.Equal />,
    id: 'equal',
  },
];

export type TinitialState = {
  mode: Mode;
  calcBlocks: ICalcBlock[];
  currentValue: string | null;
  displayValue: string;
  firstOperand: number | null;
  secondOperand: number | null;
  operator: string | null;
};

const initialState: TinitialState = {
  mode: Mode.build,
  calcBlocks: [],
  currentValue: null,
  displayValue: '0',
  firstOperand: null,
  secondOperand: null,
  operator: null,
};

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    updateCalcBlocks(state, action) {
      state.calcBlocks = action.payload;
    },
    updateMode(state, action) {
      state.mode = action.payload;
      state.currentValue = null;
      state.displayValue = '0';
      state.firstOperand = null;
      state.secondOperand = null;
      state.operator = null;
    },
    updateCurrentValue(state, action) {
      state.currentValue = action.payload;
    },
    updateDisplayValue(state, action) {
      state.displayValue = action.payload;
    },
    updateFirtsOperand(state, action) {
      state.firstOperand = action.payload;
    },
    updateSecondOperand(state, action) {
      state.secondOperand = action.payload;
    },
    updateOperator(state, action) {
      state.operator = action.payload;
    },
  },
});

// selectors

export const selectState = (state: RootState) => state.calc;

// process handlers

export const processDigitInput = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  currentValue: string | null,
  displayValue: string,
  dispatch: AppDispatch,
) => {
  const button = event.target;
  if (button instanceof HTMLElement && button.textContent) {
    const text = button.textContent;
    let value = '';

    if (!currentValue) {
      if (displayValue === '0' && text !== ',') {
        value = text;
      } else if (displayValue.length === MAX_DISPLAY_VALUE_LENGTH) {
        value = displayValue;
      } else {
        value = displayValue + text;
      }
    } else if (text === ',') {
      value = '0,';
    } else {
      value = text;
    }
    dispatch(calcSlice.actions.updateDisplayValue(value));
    dispatch(calcSlice.actions.updateCurrentValue(null));
  }
};

export function processOperatorInput(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  dispatch: AppDispatch,
  calcState: TinitialState,
) {
  const button = event.target;
  const { firstOperand, secondOperand, displayValue, currentValue, operator } = calcState;
  if (button instanceof HTMLElement) {
    const text = button.textContent;
    dispatch(calcSlice.actions.updateOperator(text));
    if (!firstOperand && !secondOperand) {
      if (displayValue !== 'Не определено') {
        dispatch(calcSlice.actions.updateFirtsOperand(+replaceCommaWithDot(displayValue)));
        dispatch(calcSlice.actions.updateCurrentValue(displayValue));
      }
    } else if (firstOperand && currentValue) {
      dispatch(calcSlice.actions.updateOperator(text));
    } else if (firstOperand && !secondOperand && !currentValue) {
      const { result, roundedResult } = calculateResultWithFirstOperand(
        firstOperand,
        displayValue,
        operator,
      );
      dispatch(calcSlice.actions.updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
      if (result === 'Не определено') {
        dispatch(calcSlice.actions.updateFirtsOperand(null));
      } else {
        dispatch(calcSlice.actions.updateFirtsOperand(roundedResult));
      }
      dispatch(calcSlice.actions.updateCurrentValue(roundedResult.toString()));
    } else if (!firstOperand && secondOperand) {
      dispatch(calcSlice.actions.updateOperator(text));
      dispatch(calcSlice.actions.updateFirtsOperand(+replaceCommaWithDot(displayValue)));
      dispatch(calcSlice.actions.updateSecondOperand(null));
      dispatch(calcSlice.actions.updateCurrentValue(displayValue));
    }
  }
}

export function processEqualInput(calcState: TinitialState, dispatch: AppDispatch) {
  const { firstOperand, secondOperand, displayValue, operator } = calcState;
  if (firstOperand && !secondOperand) {
    dispatch(calcSlice.actions.updateSecondOperand(+replaceCommaWithDot(displayValue)));

    const { result, roundedResult } = calculateResultWithFirstOperand(
      firstOperand,
      displayValue,
      operator,
    );

    if (result === 'Не определено') {
      dispatch(calcSlice.actions.updateSecondOperand(null));
    }

    dispatch(calcSlice.actions.updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
    dispatch(calcSlice.actions.updateFirtsOperand(null));
    dispatch(calcSlice.actions.updateCurrentValue(roundedResult.toString()));
  } else if (secondOperand) {
    let result: number | string = 0;
    const currentValueToNumber = +replaceCommaWithDot(displayValue);
    const secondOperandToNumber = +replaceCommaWithDot(secondOperand.toString());
    if (operator === '+') {
      result = currentValueToNumber + secondOperandToNumber;
    }
    if (operator === '-') {
      result = currentValueToNumber - secondOperandToNumber;
    }
    if (operator === 'x') {
      result = currentValueToNumber * secondOperandToNumber;
    }
    if (operator === '/') {
      if (secondOperandToNumber === 0) {
        result = 'Не определено';
      } else {
        result = currentValueToNumber / secondOperandToNumber;
      }
    }
    const roundedResult = roundResult(result);
    dispatch(calcSlice.actions.updateDisplayValue(replaceDotWithComma(roundedResult.toString())));
    dispatch(calcSlice.actions.updateCurrentValue(roundedResult.toString()));
  }
}

export const {
  updateCalcBlocks,
  updateMode,
  updateCurrentValue,
  updateDisplayValue,
  updateFirtsOperand,
  updateSecondOperand,
  updateOperator,
} = calcSlice.actions;

export const { reducer } = calcSlice;

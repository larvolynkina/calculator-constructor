import { ReactElement } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import CalcDisplay from './ui/CalcDisplay';
import CalcDigits from './ui/CalcDigits';
import CalcEqual from './ui/CalcEqual';
import CalcOperations from './ui/CalcOperations';

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
    element: <CalcDisplay />,
    id: 'display',
  },
  {
    element: <CalcOperations />,
    id: 'operations',
  },
  {
    element: <CalcDigits />,
    id: 'digits',
  },
  {
    element: <CalcEqual />,
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

export const {
  updateCalcBlocks,
  updateMode,
  updateCurrentValue,
  updateDisplayValue,
  updateFirtsOperand,
  updateSecondOperand,
  updateOperator,
} = calcSlice.actions;

export const {reducer} = calcSlice;

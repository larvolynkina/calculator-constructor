import { createSlice } from '@reduxjs/toolkit';
import { Mode } from '../../const';
import ICalcBlocks from '../../types';

export type TinitialState = {
  mode: Mode;
  calcBlocks: ICalcBlocks[];
  draggableElement: HTMLElement | null;
  currentValue: string | null;
  displayValue: string;
  firstOperand: number | null;
  secondOperand: number | null;
  operator: string | null;
};

const initialState: TinitialState = {
  mode: Mode.build,
  calcBlocks: [],
  draggableElement: null,
  currentValue: null,
  displayValue: '',
  firstOperand: null,
  secondOperand: null,
  operator: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCalcBlocks(state, action) {
      state.calcBlocks = action.payload;
    },
    updateDraggbleElement(state, action) {
      state.draggableElement = action.payload;
    },
    updateMode(state, action) {
      state.mode = action.payload;
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
    resetCalc(state) {
      state.currentValue = null;
      state.displayValue = '';
      state.firstOperand = null;
      state.secondOperand = null;
      state.operator = null;
    },
  },
});

export const {
  updateCalcBlocks,
  updateDraggbleElement,
  updateMode,
  updateCurrentValue,
  updateDisplayValue,
  updateFirtsOperand,
  updateSecondOperand,
  updateOperator,
  resetCalc,
} = appSlice.actions;

export default appSlice.reducer;

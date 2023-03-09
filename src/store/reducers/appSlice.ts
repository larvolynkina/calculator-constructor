import { createSlice } from '@reduxjs/toolkit';
import Mode from '../../const';
import ICalcBlocks from '../../types';

type TinitialState = {
  mode: Mode;
  calcBlocks: ICalcBlocks[];
  draggableElement: null | HTMLElement;
};

const initialState: TinitialState = {
  mode: Mode.build,
  calcBlocks: [],
  draggableElement: null,
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
  },
});

export const { updateCalcBlocks, updateDraggbleElement } = appSlice.actions;

export default appSlice.reducer;

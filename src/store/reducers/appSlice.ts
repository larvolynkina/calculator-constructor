import { createSlice } from '@reduxjs/toolkit';
import Mode from '../../const';
import ICalcBlocks from '../../types';

type TinitialState = {
  mode: Mode;
  calcBlocks: ICalcBlocks[];
};

const initialState: TinitialState = {
  mode: Mode.build,
  calcBlocks: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCalcBlocks(state, action) {
      state.calcBlocks = action.payload;
    },
  },
});

export const { updateCalcBlocks } = appSlice.actions;

export default appSlice.reducer;

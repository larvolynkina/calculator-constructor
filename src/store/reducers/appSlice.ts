import { createSlice } from '@reduxjs/toolkit';
import Mode from '../../const';

type TinitialState = {
  mode: Mode;
};

const initialState: TinitialState = {
  mode: Mode.build,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;

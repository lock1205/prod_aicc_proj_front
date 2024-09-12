import { createSlice } from '@reduxjs/toolkit';

import Cookie from 'js-cookie';

const tempSlice = createSlice({
  name: 'temp',
  initialState: {
    temptask: Cookie.get('tempAgreeData')
      ? JSON.parse(Cookie.get('tempAgreeData'))
      : null,
  },
  reducers: {
    tempSave: (state, action) => {
      state.temptask = action.payload.temptask;
    },
    tempComplete: (state) => {
      state.temptask = null;
      Cookie.remove('tempAgreeData');
    },
  },
});
export const { tempSave, tempComplete } = tempSlice.actions;
export default tempSlice.reducer;

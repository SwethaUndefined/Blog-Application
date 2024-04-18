import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: ''
};

export const loginFormSlice = createSlice({
  name: 'LoginFormStore',
  initialState,
  reducers: {
    setLoginForm: (state, action) => {
      return {
        ...state,
        username: action.payload,
      };
    },
  },
});

export const { setLoginForm } = loginFormSlice.actions;

export default loginFormSlice.reducer;

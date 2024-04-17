import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginForm: []
};

export const loginFormSlice = createSlice({
  name: 'LoginFormStore',
  initialState,
  reducers: {
    setLoginForm: (state, action) => {
      return {
        ...state,
        loginForm: action.payload,
      };
    },
  },
});

export const { setLoginForm } = loginFormSlice.actions;

export default loginFormSlice.reducer;

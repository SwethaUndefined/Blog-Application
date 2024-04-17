import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerForm: [], 
};

export const registerFormSlice = createSlice({
  name: 'RegisterFormStore',
  initialState,
  reducers: {
    setRegisterForm: (state, action) => {
      return {
        ...state,
        registerForm: action.payload,
      };
    },
  },
});

export const { setRegisterForm } = registerFormSlice.actions;

export default registerFormSlice.reducer;

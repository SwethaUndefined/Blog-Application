import { configureStore } from '@reduxjs/toolkit';
import registerFormReducer from './registerForm';
import loginFormReducer from './loginForm';
import blogReducer from './blog';

const store = configureStore({
  reducer: {
    registerForm: registerFormReducer,
    loginForm : loginFormReducer,
    blog:blogReducer
  },
});

export default store;

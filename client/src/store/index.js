import { combineReducers } from '@reduxjs/toolkit';
import registerFormReducer from './registerForm'; 
import loginFormReducer from './loginForm';
import blogReducer from './blog';

const RootReducer = combineReducers({
    registerForm: registerFormReducer, 
    loginForm : loginFormReducer,
    blog:blogReducer
});

export default RootReducer;

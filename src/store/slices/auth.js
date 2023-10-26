import { createSlice } from '@reduxjs/toolkit';
import { confirmPin, signin } from '../../utils/api'


const initialState = {
    isAuth: false,
    jwt: '',
    correctCredentials: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.correctCredentials = action.payload;
        },
        logUser: (state, action) => {
            const token = action.payload;
            state.isAuth = true;
            state.jwt = token;
        },
    },

});

const authActions = authSlice.actions;

export const  authReducer = authSlice.reducer;

export const connect = async (credentials, dispatch) => {
    const response = await signin(credentials);
    console.log(response);
    if (response.status===200){
        dispatch(authActions.signin(true));
    
        return true;
    }
    return false;
}

const sendPin = async (pin,email, dispatch) => {
    const response = await confirmPin({pin,email});
    if (response.status==200){
        dispatch(authActions.logUser(response.data.token));
        return;
    }
}
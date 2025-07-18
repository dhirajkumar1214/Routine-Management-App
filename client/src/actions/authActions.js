import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const register = ({ name, email, password }) => async dispatch => {
    try {
        const res = await axios.post('/api/users/register', { name, email, password });
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(loadUser());
    } catch (err) {
        dispatch({ type: REGISTER_FAIL });
    }
};

export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post('/api/users/login', { email, password });
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());
    } catch (err) {
        dispatch({ type: LOGIN_FAIL });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};

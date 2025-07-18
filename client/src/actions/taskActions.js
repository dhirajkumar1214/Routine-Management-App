import axios from 'axios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_ERROR } from './types';

export const getTasks = () => async dispatch => {
    try {
        const res = await axios.get('/api/tasks');
        dispatch({ type: GET_TASKS, payload: res.data });
    } catch (err) {
        dispatch({ type: TASKS_ERROR, payload: err.response.data });
    }
};

export const addTask = task => async dispatch => {
    try {
        const res = await axios.post('/api/tasks', task);
        dispatch({ type: ADD_TASK, payload: res.data });
    } catch (err) {
        dispatch({ type: TASKS_ERROR, payload: err.response.data });
    }
};

export const deleteTask = id => async dispatch => {
    try {
        await axios.delete(`/api/tasks/${id}`);
        dispatch({ type: DELETE_TASK, payload: id });
    } catch (err) {
        dispatch({ type: TASKS_ERROR, payload: err.response.data });
    }
};

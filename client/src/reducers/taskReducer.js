// src/reducers/taskReducer.js
import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_ERROR } from '../actions/types';

const initialState = {
    tasks: [],
    loading: true,
    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false,
            };
        case TASKS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
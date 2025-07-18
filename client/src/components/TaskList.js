import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask } from '../actions/taskActions';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    const handleDelete = id => {
        dispatch(deleteTask(id));
    };

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.name}
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

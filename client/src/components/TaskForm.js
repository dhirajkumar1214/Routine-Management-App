import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, getTask } from '../actions/taskActions';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const task = useSelector((state) => state.tasks.task);

    useEffect(() => {
        if (id) {
            dispatch(getTask(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateTask(id, { title, description }));
        } else {
            dispatch(addTask({ title, description }));
        }
        navigate('/tasks');
    };

    return (
        <div className="task-form">
            <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Save Task</button>
            </form>
        </div>
    );
};

export default TaskForm;

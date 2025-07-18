const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', protect, async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const task = new Task({ user: req.user, title, description, date });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', protect, async (req, res) => {
    const { title, description, date, isCompleted } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        task.title = title;
        task.description = description;
        task.date = date;
        task.isCompleted = isCompleted;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

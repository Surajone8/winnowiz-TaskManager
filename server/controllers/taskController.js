import Task from '../models/Task.js';
import { sendEmailNotification } from '../utils/email.js';

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Send email if task status is updated
        if (req.body.status) {
            sendEmailNotification(updatedTask); // Email notification logic
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Error updating task' });
    }
};
export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};

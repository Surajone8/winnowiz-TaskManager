import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { createTask, getTasks, updateTask, deleteTask } from './controllers/taskController.js';  // Assuming controller functions are in 'controllers/taskController.js'

const app = express();

// Middleware to handle JSON and CORS
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string (replace with your credentials if necessary)
const mongoURI = 'mongodb+srv://ysuraj18333:QLMLp8PzJrFmZNik@taskmanager.49qku.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Routes
app.post('/tasks', createTask);  // Route to create a new task
app.get('/tasks', getTasks);     // Route to get all tasks
app.put('/tasks/:id', updateTask);  // Route to update a task
app.delete('/tasks/:id', deleteTask);  // Route to delete a task

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

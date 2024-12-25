import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['Done', 'In Progress', 'Remaining'],
            default: 'Remaining',
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;

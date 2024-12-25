import React from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const EditTask = ({ task }) => {
    const navigate = useNavigate();

    const handleSave = () => {
        // After saving, navigate back to the home page
        navigate('/');
    };

    return (
        <div>
            <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
            <TaskForm task={task} onSave={handleSave} />
        </div>
    );
};

export default EditTask;

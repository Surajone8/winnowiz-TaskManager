import React from 'react';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const Home = ({ onEdit }) => {
    const navigate = useNavigate();

    const handleCreateNewTask = () => {
        onEdit(null); // Clear current task for a new task creation
        navigate('/edit');
    };

    return (
        <div>
            <h1>Task Management System</h1>
            <button onClick={handleCreateNewTask}>Create New Task</button>
            <TaskList onEdit={(task) => {
                onEdit(task);
                navigate('/edit');
            }} />
        </div>
    );
};

export default Home;

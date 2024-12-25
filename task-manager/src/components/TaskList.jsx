import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3002/tasks');
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    if (loading) {
        return <p style={styles.loading}>Loading tasks...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Task List</h2>
            {tasks.length === 0 ? (
                <p style={styles.noTasks}>No tasks available.</p>
            ) : (
                <div style={styles.taskList}>
                    {tasks.map((task) => (
                        <div key={task._id} style={styles.task}>
                            <h3 style={styles.title}>{task.title}</h3>
                            <p style={styles.description}>{task.description}</p>
                            <p style={styles.status}>
                                <strong>Status:</strong> {task.status}
                            </p>
                            <div style={styles.actions}>
                                <button
                                    onClick={() => onEdit(task)}
                                    style={{ ...styles.button, backgroundColor: '#007bff' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    style={{ ...styles.button, backgroundColor: '#dc3545' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh', // Full height
        width: '100vw', // Full width
    },
    header: {
        marginBottom: '20px',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333333',
    },
    noTasks: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#888',
    },
    taskList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%', // Take full width
        paddingBottom: '20px', // Padding at the bottom
    },
    task: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
    },
    status: {
        fontSize: '14px',
        color: '#333',
        marginBottom: '10px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
        marginTop: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default TaskList;

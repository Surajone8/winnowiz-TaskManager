import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const TaskForm = ({ task, onSave }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'Remaining');
    const [email, setEmail] = useState(task?.email || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#0056b3';
    };

    const handleMouseOut = (e) => {
        e.target.style.backgroundColor = '#007bff';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const newTask = { title, description, status, email };

        try {
            if (task) {
                // Update the task
                await axios.put(`http://localhost:3002/tasks/${task._id}`, newTask);
            } else {
                // Create a new task
                await axios.post('http://localhost:3002/tasks', newTask);
            }

            // Send email notification
            const emailParams = {
                to_email: email, // Recipient's email address
                task_title: title, // Task title
                task_status: status, // Task status
            };

            await emailjs.send(
                'service_v0fk41w', // Replace with your EmailJS Service ID
                'template_ew9z2yz', // Replace with your EmailJS Template ID
                emailParams,
                'xRLnnNajFxTGjT-En' // Replace with your EmailJS Public API Key
            );

            alert('Task saved and email sent successfully!');
            onSave();
        } catch (err) {
            console.error('Error:', err);
            setError('Error occurred while saving the task or sending the email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f0f0f0',
                padding: '20px',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        color: '#333333',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                    }}
                >
                    {task ? 'Edit Task' : 'Create New Task'}
                </h2>

                {error && (
                    <div
                        style={{
                            backgroundColor: '#ffdddd',
                            color: '#a33',
                            padding: '10px',
                            borderRadius: '4px',
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: '#555555',
                        }}
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            fontSize: '16px',
                        }}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: '#555555',
                        }}
                    >
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            fontSize: '16px',
                            resize: 'vertical',
                        }}
                        placeholder="Enter task description"
                        rows="6"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: '#555555',
                        }}
                    >
                        Status:
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            fontSize: '16px',
                        }}
                    >
                        <option value="Done">Done</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Remaining">Remaining</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: '#555555',
                        }}
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            fontSize: '16px',
                        }}
                        placeholder="Enter email for notifications"
                        required
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            padding: '15px 30px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : task ? 'Update Task' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;

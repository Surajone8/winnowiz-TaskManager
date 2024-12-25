import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditTask from './pages/EditTask';

const App = () => {
    const [currentTask, setCurrentTask] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home onEdit={(task) => setCurrentTask(task)} />} />
                <Route path="/edit" element={<EditTask task={currentTask} />} />
            </Routes>
        </Router>
    );
};

export default App;

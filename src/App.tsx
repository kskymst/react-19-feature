import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TopPage from './pages/TopPage';
import UseTransitionPage from './pages/UseTransitionPage';
import UseActionStatePage from './pages/UseActionStatePage';
import UseFormStatusPage from './pages/UseFormStatusPage';
import UseOptimisticPage from './pages/UseOptimisticPage';

function App() {
  return (
    <Router>
      <div className="App">
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/use-transition" element={<UseTransitionPage />} />
            <Route path="/use-action-state" element={<UseActionStatePage />} />
            <Route path="/use-form-status" element={<UseFormStatusPage />} />
            <Route path="/use-optimistic" element={<UseOptimisticPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

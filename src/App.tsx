import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TopPage from './pages/TopPage';
import UseTransitionPage from './pages/UseTransitionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/use-transition" element={<UseTransitionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

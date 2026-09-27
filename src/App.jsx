import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Theory from './pages/Theory';
import Examples from './pages/Examples';
import Exercises from './pages/Exercises';
import ErrorsAndAnswers from './pages/ErrorsAndAnswers';
import { MotionConfig } from 'framer-motion';

function App() {
  return (
    <MotionConfig reducedMotion="user"><Router>
      <div className="app-container">
        <Navbar />
        <main className="container" style={{ padding: '2rem 1rem', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teoria" element={<Theory />} />
            <Route path="/ejemplos" element={<Examples />} />
            <Route path="/ejercicios" element={<Exercises />} />
            <Route path="/respuestas" element={<ErrorsAndAnswers />} />
          </Routes>
        </main>
      </div>
    </Router></MotionConfig>
  );
}

export default App;

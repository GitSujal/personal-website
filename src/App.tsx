import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HireMePage from './pages/HireMePage';
import VenturesPage from './pages/VenturesPage';

function App() {
  return (
    <HelmetProvider>
      <HeroUIProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hire-me" element={<HireMePage />} />
              <Route path="/ventures" element={<VenturesPage />} />
            </Routes>
          </div>
        </Router>
      </HeroUIProvider>
    </HelmetProvider>
  );
}

export default App;

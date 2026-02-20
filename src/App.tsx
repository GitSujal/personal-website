import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from './components/Navbar';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const HireMePage = React.lazy(() => import('./pages/HireMePage'));
const VenturesPage = React.lazy(() => import('./pages/VenturesPage'));

export default function App() {
  return (
    <HelmetProvider>
      <NextUIProvider>
        <Router>
          <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors min-h-screen">
            {/* Skip to main content link for accessibility and crawlers */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:dark:bg-gray-900 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-teal-600"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="pt-20">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div></div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/hire-me" element={<HireMePage />} />
                  <Route path="/ventures" element={<VenturesPage />} />
                </Routes>
              </Suspense>
            </main>
            <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
                <img src="/logo.svg" alt="Sujal Dhungana" className="h-8 w-8 rounded" />
                <p>&copy; {new Date().getFullYear()} Sujal Dhungana. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </NextUIProvider>
    </HelmetProvider>
  );
}

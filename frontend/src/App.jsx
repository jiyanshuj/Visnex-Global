import React, { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import HomePage from './components/homepage'
import StartupsPage from './components/StartupsPage'
import InvestorsPage from './components/investors'
import PartnershipsPage from './components/partnerships'
import SuccessStoriesPage from './components/success-stories'
import GrowthTools from './components/growth-Tools'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#' symbol
      const validPages = ['home', 'startups', 'investors', 'partnerships', 'success-stories', 'growth-tools'];

      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        // Default to home if no valid hash
        if (!window.location.hash) {
          window.location.hash = '#home';
        }
        setCurrentPage('home');
      }
    };

    // Set initial page from URL hash on mount
    handleHashChange();
    setIsInitialized(true);

    // Listen for hash changes (back/forward buttons, direct URL navigation)
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when page changes (only after initialization)
  useEffect(() => {
    if (isInitialized && window.location.hash !== `#${currentPage}`) {
      window.location.hash = `#${currentPage}`;
    }
  }, [currentPage, isInitialized]);

  return (
    <div className="bg-black min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'startups' && <StartupsPage />}
      {currentPage === 'investors' && <InvestorsPage />}
      {currentPage === 'partnerships' && <PartnershipsPage />}
      {currentPage === 'success-stories' && <SuccessStoriesPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'growth-tools' && <GrowthTools setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default App

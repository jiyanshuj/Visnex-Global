import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import StartupsPage from './components/StartupsPage';
import InvestorsPage from './components/investors';
import PartnershipsPage from './components/partnerships';
import SuccessStoriesPage from './components/success-stories';
import GrowthTools from './components/growth-Tools.jsx';
import AiAssistantPage from './AiAssistantPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [entityType, setEntityType] = useState('investor');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const validPages = [
        'home',
        'startups',
        'investors',
        'partnerships',
        'success-stories',
        'growth-tools',
        'ai-assistant',
      ];

      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        if (!window.location.hash) {
          window.location.hash = '#home';
        }
        setCurrentPage('home');
      }
    };

    handleHashChange();
    setIsInitialized(true);

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isInitialized && window.location.hash !== `#${currentPage}`) {
      window.location.hash = `#${currentPage}`;
    }
  }, [currentPage, isInitialized]);

  return (
    <div className="bg-black min-h-screen">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        entityType={entityType}
        setEntityType={setEntityType}
      />

      {currentPage !== 'ai-assistant' && (
        <button
          type="button"
          onClick={() => setCurrentPage('ai-assistant')}
          className="fixed right-6 bottom-10 z-[60] rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 transition hover:scale-105"
        >
          AI Assistant
        </button>
      )}

      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'startups' && <StartupsPage />}
      {currentPage === 'investors' && (
        <InvestorsPage entityType={entityType} setEntityType={setEntityType} />
      )}
      {currentPage === 'partnerships' && <PartnershipsPage />}
      {currentPage === 'success-stories' && (
        <SuccessStoriesPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'growth-tools' && (
        <GrowthTools setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'ai-assistant' && (
        <AiAssistantPage setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default App;

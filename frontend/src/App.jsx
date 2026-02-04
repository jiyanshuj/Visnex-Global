import React, { useState } from 'react'
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

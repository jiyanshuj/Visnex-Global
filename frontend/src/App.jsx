import React, { useState } from 'react'
import Navbar from './navbar'
import HomePage from './homepage'
import StartupsPage from './StartupsPage'
import InvestorsPage from './investors'
import PartnershipsPage from './partnerships'
import SuccessStoriesPage from './success-stories'
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
    </div>
  )
}

export default App

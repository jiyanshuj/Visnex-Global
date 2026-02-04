import React, { useState } from 'react'
import Navbar from './navbar'
import HomePage from './homepage'
import StartupsPage from './StartupsPage'
import InvestorsPage from './investors'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'startups' && <StartupsPage />}
      {currentPage === 'investors' && <InvestorsPage />}
    </>
  )
}

export default App

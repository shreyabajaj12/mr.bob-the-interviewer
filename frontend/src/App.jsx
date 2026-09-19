import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResumeUpload from './components/ResumeUpload'
import Interview from './components/Interview'
import End from './components/End'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/upload" element={<ResumeUpload/>}/>
        <Route path="/interview" element={<Interview/>}/>
        <Route path="/end" element={<End/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

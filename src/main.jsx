import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/site/:id" element={<App />} />
        {/* Redirect home to site 1 for demo purposes if no ID is provided */}
        <Route path="/" element={<Navigate to="/site/1" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom'
import DashBoard from './components/DashBoard/DashBoard'
import History from './components/History/history'
import Admin from './components/Admin/Admin'
import Login from './components/Login/login'
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder'

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/';

  return (
    <div className="App">
      {!isLoginRoute && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/history" element={<History />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App

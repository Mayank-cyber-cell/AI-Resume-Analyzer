import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/sidebar/sidebar'
import { Routes, Route } from 'react-router-dom'
import DashBoard from './components/DashBoard/DashBoard'
import History from './components/History/history'
import Admin from './components/Admin/admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  )
}

export default App

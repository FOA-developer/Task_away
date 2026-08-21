import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/public/LoginPage"
import SignUpPage from "./pages/public/SignUpPage"
import LandingPage from './pages/public/LandingPage'
import Calendar from './pages/private/Calendar'
import Settings from './pages/private/Settings'
import Dashboard from './pages/private/Dashboard'
import Tasks from './pages/private/Tasks'
import Teams from './pages/private/Teams'
import ProtectedRoute from './components/shared/ProtectedRoute'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} /> 
          <Route path="/signup" element={<SignUpPage/>} /> 
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>} />
          <Route path="/teams" element={<ProtectedRoute><Teams/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

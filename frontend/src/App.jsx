import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/public/LoginPage"
import SignUpPage from "./pages/public/SignUpPage"
import LandingPage from './pages/public/LandingPage'


function App() {

  return (
    <>
      <Routes>
        <Route path="/welcome" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} /> 
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

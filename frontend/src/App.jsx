import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/public/LoginPage"
import SignUpPage from "./pages/public/SignUpPage"
import LandingPage from './pages/public/LandingPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} /> 
          <Route path="/signup" element={<SignUpPage/>} /> 
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/public/LoginPage"
import SignUpPage from "./pages/public/SignUpPage"


function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} /> 
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

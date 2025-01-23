import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Login"
import SignupPage from "./pages/Signup"
import ProfilePage from "./pages/profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

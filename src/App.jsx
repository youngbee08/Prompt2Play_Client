import "./App.css"
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import VerifyAccount from "./pages/VerifyAccount"
import AuthProvider from "./contexts/AuthContext"
import { Toaster } from "sonner"
import CheckMailMessage from "./pages/CheckMailMessage"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import GennerateVideo from "./components/GennerateVideo"
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verify" element={<CheckMailMessage/>}/>
          <Route path="/verify/:token" element={<VerifyAccount/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/generate" element={<GennerateVideo/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" expand closeButton visibleToasts={1}/>
    </AuthProvider>
  )
}

export default App
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
import UpdatePassword from "./pages/UpdatePassword"
import UpdatePasswordFromMail from "./pages/UpdatePasswordFromMail"
import Generate from "./pages/Generate"
import AccountCenter from "./pages/AccountCenter"
import History from "./pages/History"
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/updatePassword" element={<UpdatePassword/>}/>
          <Route path="/mail/updatePassword/:token" element={<UpdatePasswordFromMail/>}/>
          <Route path="/verify" element={<CheckMailMessage/>}/>
          <Route path="/verify/:token" element={<VerifyAccount/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/ai/text-to-video" element={<Generate/>}/>
            <Route path="/user/account-center" element={<AccountCenter/>}/>
            <Route path="/user/history" element={<History/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" expand closeButton visibleToasts={1}/>
    </AuthProvider>
  )
}

export default App
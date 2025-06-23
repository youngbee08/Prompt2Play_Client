import axios from 'axios';
import React, { createContext, useState } from 'react'
import { toast } from 'sonner';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {

    const base_Url = import.meta.env.VITE_SERVER_URL;

    const [authLoading, setAuthLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    
    const authRequest = async (userDetails,authRequestType) => {
        setAuthLoading(true)
        try {
            const res = await fetch(`${base_Url}/auth/${authRequestType}`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(userDetails)
            });
            const data = await res.json();
            data.user && setCurrentUser(data.user)

            if (data.status === "success") {
                if (data.message !== "User reloaded successfully") {
                    toast.success(data.message);
                }
                setIsSuccess(true);
                } else {
                toast.error(data.message);
            }

            return data
        } catch (error) {
            console.log(error);
            if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
                toast.error("Unable to connect. Please check your internet or try again shortly.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally{
            setAuthLoading(false)
        }
    };

    
    const value = {
        authRequest,
        authLoading,
        setAuthLoading,
        isSuccess,
        currentUser,
        setCurrentUser
    };
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
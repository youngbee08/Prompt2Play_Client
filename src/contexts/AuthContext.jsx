import React, { createContext, useState } from 'react'
import { toast } from 'sonner';

export const AuthContext = createContext();
const AuthProvider = ({children}) => {

    const base_Url = import.meta.env.VITE_SERVER_URL;

    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    
    const authRequest = async (userDetails,authRequestType) => {
        try {
            const res = await fetch(`${base_Url}/auth/${authRequestType}`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(userDetails)
            });
            const data = await res.json();
            if (data.status === "success") {
                if (data.message !== "User reloaded successfully") {
                    toast.success(data.message)
                }
            } else {
                toast.error(data.message)
            }
            return data
        } catch (error) {
            console.log(error);
            if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
                toast.error("Unable to connect. Please check your internet or try again shortly.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }   
        }

    };
    
    const videoRequestWithToken = async (userDetails, authRequestType, authMethodType) =>{
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${base_Url}/video/${authRequestType}`, {
                method:`${authMethodType}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(userDetails)
            });
            const data = await res.json();

            return data
        } catch (error) {
            console.log(error)
            if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
                toast.error("Unable to connect. Please check your internet or try again shortly.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }   
        }
    };

    const authRequestWithTokenGet = async () =>{
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${base_Url}/auth/user`, {
                method:`GET`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();

            return data
        } catch (error) {
            console.log(error)
            if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
                toast.error("Unable to connect. Please check your internet or try again shortly.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }   
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        toast.success("Logged out successfully");
    }

    const checkIsAuthenticated = () =>{
        const hasToken = localStorage.getItem("accessToken");
        if (!hasToken) {
            return(false)
        } else{
            return(true)
        }
    };

    
    const value = {
        authRequest,
        videoRequestWithToken,
        authRequestWithTokenGet,
        isSigningUp,
        setIsSigningUp,
        isSigningIn,
        setIsSigningIn,
        currentUser,
        setCurrentUser,
        checkIsAuthenticated,
        logout
    };
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
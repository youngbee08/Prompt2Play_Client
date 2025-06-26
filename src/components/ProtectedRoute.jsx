import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = () => {
    const {checkIsAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=> {
        if (!checkIsAuthenticated()) {
            navigate("/login")
            toast.warning("Oops! You have to log in before you continue")
        }
    },[checkIsAuthenticated,navigate])
  return checkIsAuthenticated() && <Outlet/>
}

export default ProtectedRoute
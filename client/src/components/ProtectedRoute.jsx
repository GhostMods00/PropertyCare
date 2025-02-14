import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
const ProtectedRoute = ({ children }) => { 
    const { isAuthenticated, loading } = useAuth(); 
    if (loading) {
     return <div>Loading...</div>; // I will create a proper loading component
    }
 if (!isAuthenticated) { 
    return <Navigate to="/login" />; 
} 
return children; 
}; 
export default ProtectedRoute;
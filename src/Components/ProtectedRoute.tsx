import { useAuth } from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ( 
  { children }
) => {
    const { user } = useAuth();
  console.log("userrrrrr",user);
    if (user===null || user===undefined) {
      return <Navigate to="/login" />;
    }
    return children;

  };
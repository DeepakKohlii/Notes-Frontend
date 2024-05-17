import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useLocalStorage("user", undefined);
  const navigate = useNavigate();

  const login = async (data: any) => {
    try {
      const response = await fetch("http://notes-backend-production-b684.up.railway.app/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data?.userData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const responseData = await response.json();

      const token = responseData.access
      console.log("Token:", token);
      localStorage.setItem("jwt", token);
      setUser(token);
      navigate("/");

    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = useMemo<any>(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

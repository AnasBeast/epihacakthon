import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const verifyUser = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, 
            {headers: {Authorization: `Bearer ${token}`}}
        );
        console.log("User logged in successfully:", data);
        setUser(data.user);
        return data.user;
    } catch (error) {
        console.error('User not logged in:', error);
        setUser(null);
        return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, logout, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

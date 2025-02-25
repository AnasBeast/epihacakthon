import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { verifyUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const isVerified = await verifyUser();
      console.log("isVerified", isVerified);
      if (!isVerified) {
        navigate("/login");
      }
    };
    checkUser();
  }, []);

  return children;
};

export default ProtectedRoute;

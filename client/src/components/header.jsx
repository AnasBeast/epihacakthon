import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, verifyUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      await verifyUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleClick = async () => {
    await logout();
    navigate("/");
  };


  return (
    <header className="w-full flex justify-between items-center fixed top-0 left-0 p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">KIDOAI Tutor</h1>
      <nav>
        <ul className="flex space-x-4 text-blue-500 font-semibold">
          
          {user ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/challenges">Start Learning</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleClick}>Logout</button></li>
            </>
          ) : (
            <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;


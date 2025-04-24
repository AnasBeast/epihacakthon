import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Modal from './modal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';


const OauthLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResult, setApiResult] = useState("");
  const navigate = useNavigate();
  const { verifyUser } = useAuth();

  return (
    <>
    <GoogleLogin
      onSuccess={credentialResponse => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);
        console.log("Google user", decoded);
        // Send to backend
        axios.post(`${process.env.REACT_APP_API_URL}/user/auth/google`, 
          {
           token 
        
          })
          .then(async data => {
            console.log(data);
            if (data.status === 200) {
              localStorage.setItem("token", data.data.token);
              await verifyUser();
              setIsModalOpen(true);
              setApiResult(data.data.message);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              console.log("Login Failed", data);
            }
          });
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {apiResult}
        </pre>
      </Modal>
      </>
  );
};

export default OauthLogin
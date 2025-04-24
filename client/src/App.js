import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/login"
import Signup from "./screens/signup";
import HomePage from "./screens/home"; 
import ProfilePage from "./screens/profile";
import EditProfile from "./screens/editProfile";
import QuizQuestion from "./screens/quizz";
import QNA from "./screens/question";
import FillInTheGaps from "./screens/fillgaps";
import Challenges from "./screens/challenges";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { GoogleOAuthProvider } from '@react-oauth/google';

const App= () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
            <Route 
              path="/edit-profile" 
              element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
              } 
            />
            <Route 
              path="/quizz" 
              element={
              <ProtectedRoute>
                <QuizQuestion />
              </ProtectedRoute>
              } 
            />
            <Route 
              path="/qna" 
              element={
              <ProtectedRoute>
                <QNA />
              </ProtectedRoute>
              } 
            />
            <Route 
              path="/words" 
              element={
              <ProtectedRoute>
                <FillInTheGaps />
              </ProtectedRoute>
              } 
            />
            <Route 
              path="/challenges" 
              element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
              } 
            />
            
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
    
  );
}

export default App

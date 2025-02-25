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

// Simulated Pokemon data
const pokemonData = [
  { name: "Pikachu", type: "Electric", description: "A mouse-like Pokemon that can generate electricity." },
  { name: "Charizard", type: "Fire/Flying", description: "A dragon-like Pokemon that breathes fire." },
  { name: "Bulbasaur", type: "Grass/Poison", description: "A plant-like Pokemon with a bulb on its back." },
  { name: "Squirtle", type: "Water", description: "A turtle-like Pokemon that can shoot water." },
  { name: "Mewtwo", type: "Psychic", description: "A powerful, genetically engineered Pokemon." },
]

const App= () => {
  return (
   <Router>
      <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={< EditProfile/>} />
          <Route path="/quizz" element={< QuizQuestion/>} />
          <Route path="/qna" element={< QNA/>} />
          <Route path="/words" element={< FillInTheGaps/>} />
          <Route path="/challenges" element={< Challenges/>} />

          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
   </Router>
  )
}

export default App

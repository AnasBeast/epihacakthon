import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="text-center mt-24">
        <h2 className="text-4xl font-extrabold text-blue-700">Welcome to KIDOAI Tutor! 🚀</h2>
        <p className="text-lg text-gray-700 mt-2">Learn, Play, and Have Fun with AI-powered lessons!</p>
        <button onClick={()=>navigate("/challenges")} className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg text-xl shadow-md hover:bg-yellow-600">
          Start Learning
        </button>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8TPVDfiXHE6Jnkw8i5OpagamJvPME4NmgA&s" alt="AI Mascot" className="mt-6 w-40 mx-auto"/>
      </section>

      {/* Features Section */}
      <section className="my-10 text-center">
        <h3 className="text-3xl font-bold text-blue-600">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold text-blue-500">📚 AI-Powered Learning</h4>
            <p className="text-gray-600">Lessons adapt to your child’s progress in real-time.</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold text-blue-500">🎮 Fun Quizzes & Games</h4>
            <p className="text-gray-600">Interactive activities to keep learning exciting.</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold text-blue-500">🏆 Gain Score</h4>
            <p className="text-gray-600">Kids stay motivated with score progress.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
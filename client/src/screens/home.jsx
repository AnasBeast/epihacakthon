import React from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.section
        className="text-center mt-24"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-blue-700">Welcome to KIDOAI Tutor! 🚀</h2>
        <p className="text-lg text-gray-700 mt-2">Learn, Play, and Have Fun with AI-powered lessons!</p>
        <motion.button
          className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg text-xl shadow-md hover:bg-yellow-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to="/challenges">Start Learning</Link>
        </motion.button>
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8TPVDfiXHE6Jnkw8i5OpagamJvPME4NmgA&s"
          alt="AI Mascot"
          className="mt-6 w-40 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="my-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-blue-600">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <motion.div
            className="p-4 bg-white shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-xl font-semibold text-blue-500">📚 AI-Powered Learning</h4>
            <p className="text-gray-600">Lessons adapt to your child’s progress in real-time.</p>
          </motion.div>
          <motion.div
            className="p-4 bg-white shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-xl font-semibold text-blue-500">🎮 Fun Quizzes & Games</h4>
            <p className="text-gray-600">Interactive activities to keep learning exciting.</p>
          </motion.div>
          <motion.div
            className="p-4 bg-white shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-xl font-semibold text-blue-500">🏆 Gain Score</h4>
            <p className="text-gray-600">Kids stay motivated with score progress.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
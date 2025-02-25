import React from "react"
import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4 text-blue-600">Welcome to AI Tutor!</h2>
      <p className="mb-6 text-xl">Let's start learning and have fun together!</p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/learn"
          className="bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold hover:bg-green-600 transition-colors duration-300 animate-bounce"
        >
          Start Learning
        </Link>
        <Link
          to="/quiz"
          className="bg-yellow-500 text-white px-6 py-3 rounded-full text-xl font-bold hover:bg-yellow-600 transition-colors duration-300"
        >
          Take a Quiz
        </Link>
      </div>
      <img src="/placeholder.svg?height=300&width=300" alt="Happy learning" className="mx-auto mt-8" />
    </div>
  )
}

export default Welcome


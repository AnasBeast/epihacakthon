import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"

const QNA = () => {
  const [question, setQuestion] = useState("Hello World")
  const [userAnswer, setUserAnswer] = useState("")
  const [result, setResult] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.lang = "en-US"
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setUserAnswer(transcript)
      }
      recognitionInstance.onend = () => setIsListening(false)
      setRecognition(recognitionInstance)
    }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (userAnswer.toLowerCase().trim() === question.toLowerCase().trim()) {
      setResult("Correct!")
    } else {
      setResult("Incorrect. Try again!")
    }
  }

  const startListening = () => {
    if (recognition) {
      recognition.start()
      setIsListening(true)
    }
  }

  return (
    <div className="bg-blue-100 min-h-screen">
        <Header/>
        <div className="bg-blue-100 pt-40">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
            Repeat The sentence below:
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question}
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            disabled={true}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Answer
          </motion.button>
          <motion.button
            type="button"
            onClick={startListening}
            className={`flex-1 py-2 px-4 rounded-md text-white transition duration-150 ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? "Listening..." : "Speak Answer"}
          </motion.button>
        </motion.div>
      </form>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mt-6 p-4 rounded-md ${
            result === "Correct!" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {result}
        </motion.div>
      )}
    </div>
        </div>
        <Footer/>
    </div>
  )
}

export default QNA


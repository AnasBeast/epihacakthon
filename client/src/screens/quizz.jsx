
import React, { useEffect } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../components/header"
import Footer from "../components/footer"

const QuizQuestion = () => {
    const [loading,setLoading] = useState(true);
    const [question, setQuestion] = useState("What's the capital of France?")
    const [answers, setAnswers] = useState([
        { id: "1", text: "London", isCorrect: false },
        { id: "2", text: "Berlin", isCorrect: false },
        { id: "3", text: "Paris", isCorrect: true },
        { id: "4", text: "Madrid", isCorrect: false },
    ])
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch("http://localhost:3030/user/getAiQuizz", {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                const data = await response.json()
                console.log("User logged in successfully:", data)
                if(data.error!="true"){
                    setQuestion(data.question)
                    setAnswers(data.options)
                }
                setLoading(false)          
              } catch (error) {
                console.error("Error signing up:", error)
              }

        }
        fetchQuestion()

    },[])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId)
  }
  const addAnswer = async () => {
    // Simulated API call
    try {
      const response = await fetch("http://localhost:3030/user/submit", {
        method: "Post",
        headers: { "Content-Type": "application/json" ,
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        
        body: JSON.stringify({ 
            isValid: isCorrect,
            answer: answers.find((answer) => answer.id === selectedAnswer)?.text
         }),
      })
      const data = await response.json()
      console.log("Answer submitted successfully:", data)
      setTimeout(() => {
        window.location.reload()
      },1000)
    } catch (error) {
        console.error("Error signing up:", error)
      
    }
  }
  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true)
      addAnswer()
    }
  }

  const isCorrect = answers.find((answer) => answer.id === selectedAnswer)?.isCorrect
  
  return (
    <div className="min-h-screen bg-blue-100">
        <Header />
        {loading? (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        ):(
            <div className="bg-blue-100 min-h- pt-20">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question}
      </motion.h2>
      <div className="space-y-4 mb-6">
        {answers.map((answer) => (
          <motion.div
            key={answer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * Number.parseInt(answer.id) }}
          >
            <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition duration-150">
              <input
                type="radio"
                name="answer"
                value={answer.id}
                checked={selectedAnswer === answer.id}
                onChange={() => handleAnswerSelect(answer.id)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">{answer.text}</span>
            </label>
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          selectedAnswer ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
        } transition duration-150`}
        whileHover={selectedAnswer ? { scale: 1.05 } : {}}
        whileTap={selectedAnswer ? { scale: 0.95 } : {}}
      >
        Submit Answer
      </motion.button>
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mt-6 p-4 rounded-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {isCorrect ? "Correct!" : "Incorrect. Try again!"}
        </motion.div>
      )}
    </div>
        </div>
        )}
    <Footer />
    </div>
  )
}

export default QuizQuestion


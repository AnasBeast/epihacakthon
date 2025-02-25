import React from "react"
import { useState, useEffect } from "react"


const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [difficulty, setDifficulty] = useState(1)

  useEffect(() => {
    // In a real application, this would fetch questions from an API or database
    const generateQuestions = () => {
      const topics = ["Math", "Science", "Language"]
      const generatedQuestions = topics.map((topic, index) => ({
        id: index + 1,
        text: `${topic} question for difficulty level ${difficulty}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: Math.floor(Math.random() * 4),
      }))
      setQuestions(generatedQuestions)
    }

    generateQuestions()
  }, [difficulty])

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setDifficulty((prev) => Math.min(prev + 1, 5))
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  if (showResult) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Quiz Results</h2>
        <p className="text-2xl mb-4">
          You scored {score} out of {questions.length}!
        </p>
        <p className="text-xl mb-4">
          {score === questions.length
            ? "Perfect score! You're a genius!"
            : score >= questions.length / 2
              ? "Great job! Keep practicing to improve even more!"
              : "Don't worry, keep practicing and you'll get better!"}
        </p>
        <button
          onClick={restartQuiz}
          className="bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold hover:bg-green-600 transition-colors duration-300 animate-bounce"
        >
          Take Another Quiz
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Quiz Time!</h2>
      <div className="bg-yellow-100 p-4 rounded-lg mb-4">
        <p className="text-xl mb-4">{question.text}</p>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-300 text-lg"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xl">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <p className="text-xl">Difficulty: {difficulty}/5</p>
    </div>
  )
}

export default Quiz


import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
const FillInTheGaps = () => {
  const [sentence] = useState({
    text: "The quick _____ fox jumps over the _____ dog.",
    gaps: [1, 5], // Positions of the gaps in sentence
  });

  const [words, setWords] = useState([
    { id: "word1", text: "brown" },
    { id: "word2", text: "lazy" },
    { id: "word3", text: "smart" },
    { id: "word4", text: "active" },
  ]);

  const [filledGaps, setFilledGaps] = useState(new Array(sentence.gaps.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedGap, setSelectedGap] = useState(null);

  const selectGap = (index) => {
    setSelectedGap(index);
  };

  const fillGap = (word) => {
    if (selectedGap !== null) {
      setFilledGaps((prev) => {
        const newGaps = [...prev];
        newGaps[selectedGap] = word;
        return newGaps;
      });
      setWords(words.filter((w) => w.id !== word.id));
      setSelectedGap(null);
    }
  };

  const removeFromGap = (index) => {
    setWords([...words, filledGaps[index]]);
    setFilledGaps((prev) => {
      const newGaps = [...prev];
      newGaps[index] = null;
      return newGaps;
    });
  };

  const checkAnswer = () => {
    const correctWords = ["brown", "lazy"];
    setIsCorrect(
      filledGaps.every((word, index) => word && word.text.toLowerCase() === correctWords[index])
    );
  };

  const resetGame = () => {
    setFilledGaps(new Array(sentence.gaps.length).fill(null));
    setWords([
      { id: "word1", text: "brown" },
      { id: "word2", text: "lazy" },
      { id: "word3", text: "smart" },
      { id: "word4", text: "active" },
    ]);
    setIsCorrect(null);
    setSelectedGap(null);
  };

  return (
    <div className="min-h-screen bg-blue-100">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fill in the Gaps
      </motion.h1>
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <p className="text-xl mb-4">
          {(() => {
            let gapCounter = 0; // Counter to track gap positions
            return sentence.text.split(" ").map((word, index) => {
              if (word === "_____") {
                const currentGap = gapCounter;
                gapCounter++; // Move to the next gap index
                return (
                  <span
                    key={index}
                    onClick={() => selectGap(currentGap)}
                    className={`inline-block w-24 h-8 mx-1 border-b-2 cursor-pointer px-2 py-1 rounded text-center ${
                      selectedGap === currentGap ? "border-indigo-400 bg-indigo-100" : "border-gray-300"
                    }`}
                  >
                    {filledGaps[currentGap]?.text || "_____"}
                  </span>
                );
              } else {
                return <span key={index} className="mr-1">{word}</span>;
              }
            });
          })()}
        </p>
      </motion.div>
      <motion.div className="flex flex-wrap gap-2 mb-8">
        {words.map((word) => (
          <span
            key={word.id}
            onClick={() => fillGap(word)}
            className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-indigo-600"
          >
            {word.text}
          </span>
        ))}
      </motion.div>
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={checkAnswer}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Check Answer
        </motion.button>
        <motion.button
          onClick={resetGame}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Reset
        </motion.button>
      </div>
      {isCorrect !== null && (
        <motion.div className={`mt-6 p-4 rounded-md text-center ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {isCorrect ? "Correct! Well done!" : "Not quite right. Try again!"}
        </motion.div>
      )}
    </div>
        </div>
        <Footer />
    </div>
  );
};

export default FillInTheGaps;

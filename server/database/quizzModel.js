const mongoose = require("mongoose");

const quizzSchema = new mongoose.Schema(
  {
    question: String,
    options: [
      {
        id: Number,
        text: String,
        isCorrect: Boolean,
      },
    ],
  },
);

module.exports = mongoose.model("Quizzes", quizzSchema);

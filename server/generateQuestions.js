const fs = require('fs');
const fetch = require('node-fetch');
const { jsonrepair } = require('jsonrepair');

const promptTemplate = (batchNumber) => `
You are an expert question generator. Generate ${batchNumber} diverse questions across different fields (science, history, math, sports, literature, technology, geography, art).

For each question, generate:
- question text
- 4 options (each option has an id from 1 to 4, text for the option, and whether it is the correct answer - true/false).

The final result must be an array of ${batchNumber} objects. Each object should look like this:

{
    question: "What is the capital of France?",
    options: [
        { id: 1, text: "Berlin", isCorrect: false },
        { id: 2, text: "Madrid", isCorrect: false },
        { id: 3, text: "Paris", isCorrect: true },
        { id: 4, text: "Rome", isCorrect: false }
    ]
}

Distribute topics evenly (each field gets some questions). Respond only with the raw JSON array. Do not stop early. Continue until ${batchNumber} questions are generated.
`;

async function generateQuestions() {
    const totalQuestions = 500;
    const batchSize = 100;
    let allQuestions = [];

    for (let i = 0; i < totalQuestions / batchSize; i++) {
        const prompt = promptTemplate(batchSize);

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'mistral',
                prompt,
                max_tokens: 4096,
                stream: false,
            }),
        });

        const data = await response.json();
        let rawText = data.response.trim();

        // Sanitize response
        rawText = rawText.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
        
        try {
            const repairedJson = jsonrepair(rawText);
            const questionsArray = JSON.parse(repairedJson);

            allQuestions = [...allQuestions, ...questionsArray];
        } catch (err) {
            console.error('❌ Error parsing batch:', err);
        }
    }

    // Save the full set of questions
    fs.writeFileSync('questions.json', JSON.stringify(allQuestions, null, 2), 'utf-8');
    console.log(`✅ ${allQuestions.length} questions saved to questions.json`);

}

generateQuestions();

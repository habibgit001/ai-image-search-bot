require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.generateContent("Hello!");
        console.log(chat.response.text());
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

testGemini();

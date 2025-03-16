const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const chat = await model.generateContent(message);
        const botMessage = chat.response.text();
        res.json({ message: botMessage });
    } catch (err) {
        console.error('Error from Gemini API:', err);

        if (err.status === 429) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }

        res.status(500).json({ error: 'Error communicating with AI' });
    }
});

module.exports = router;

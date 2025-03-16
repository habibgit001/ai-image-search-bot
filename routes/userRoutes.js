const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username } = req.body;
    res.json({ message: `User ${username} registered successfully!` });
});

module.exports = router;

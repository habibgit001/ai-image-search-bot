const express = require('express');
const axios = require('axios');
const router = express.Router();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

router.get('/search', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query, per_page: 5 },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });

        const images = response.data.results.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            description: photo.alt_description
        }));

        res.json({ images });
    } catch (err) {
        console.error('Error fetching images from Unsplash:', err);
        res.status(500).json({ error: 'Error fetching images' });
    }
});

module.exports = router;

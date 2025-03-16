require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');

const imageRoutes = require('./routes/imageRoutes');

// const imageRoutes = require('./routes/imageRoutes');
// app.use('/images', imageRoutes);



const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', imageRoutes);


// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/chat', chatRoutes);
app.use('/user', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

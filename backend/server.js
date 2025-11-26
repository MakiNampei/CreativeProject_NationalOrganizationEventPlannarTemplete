const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

require('./models/User');
require('./models/Organization');
require('./models/Chapter');
require('./models/Event');
require('./models/CollabRequest');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chapters', require('./routes/chapterRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));


// -----------------------------------------
// DEPLOYMENT: Serve Frontend Static Files
// -----------------------------------------
// Point this to where you will put the 'build' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// -----------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
}); 
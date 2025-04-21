const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware 
app.use(express.json()); // Lets the server read JSON data from requests
app.use(cors()); // Allows Angular to connect to this server

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Load routes 
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
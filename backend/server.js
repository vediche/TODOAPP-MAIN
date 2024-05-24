const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const accomplishedRoutes = require('./routes/accomplished'); // Import accomplished routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Use the routes
app.use('/todos', todoRoutes);
app.use('/accomplished', accomplishedRoutes); // Use accomplished routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

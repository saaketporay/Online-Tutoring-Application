const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const app = express();
const http = require('http');
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());


// Basic route
app.use('/user', userRoutes);
app.use('/tutor', tutorRoutes);
app.get('*', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

const server = http.createServer(app);
// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

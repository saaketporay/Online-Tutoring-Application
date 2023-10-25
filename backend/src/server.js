const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const http = require('http');
const port = 3000;

// Middleware
app.use(express.json());



// Basic route
app.get('*', (req, res) => {
  res.json({ message: 'Hello, world!' });
});
app.use('/user', userRoutes);

const server = http.createServer(app);
// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./utils/db');
// const router = require('./router/routes');
// const cors = require("cors");
// const http = require('http');
// const socketIO = require('socket.io');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin:"http://localhost:3000",
//   methods:"GET,POST,PUT,DELETE",
// //   credentials:true
// }));
// app.use(router);

// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: '*',
//   }
// });

// app.set('io', io);

// const PORT = process.env.PORT || 2023;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const router = require('./router/routes');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// store io instance globally
app.set('io', io);

app.use(cors());
app.use(express.json());
app.use(router);

// log socket connections
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on('join', (milestoneId) => {
    socket.join(milestoneId);
    console.log(`Socket ${socket.id} joined room ${milestoneId}`);
  });
});

const PORT = process.env.PORT || 2023;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

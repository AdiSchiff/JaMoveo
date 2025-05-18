const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/registration');
const songRoutes = require('./routes/songs');
const { setupSocket } = require('./utils/socketManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://ja-moveo-umber.vercel.app",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

setupSocket(io);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

server.listen(PORT, () => {
  console.log(`Server is running`);
});

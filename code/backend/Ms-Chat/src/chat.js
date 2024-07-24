const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});

const Room = require('./models/Room.js');
const RoomMember = require('./models/RoomMember.js');
const Chat = require('./models/Chat.js');
const UserTest = require('./models/UserTest.js');

mongoose.connect('mongodb://localhost/Chat')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      styleSrcElem: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "http://localhost:5000"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

// Endpoint de login pour générer un token JWT
app.post('/login', async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = await UserTest.findOne({ email });
    if (!user) {
      user = new UserTest({ email, name });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware pour vérifier le token JWT
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    let user = await UserTest.findOne({ _id: decoded.id });
    if (!user) {
      user = new UserTest({ _id: decoded.id, name: decoded.name });
      await user.save();
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Token validation error:', err);
    return res.status(403).send('Invalid token');
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', async ({ roomId }) => {
    const user = socket.handshake.query.user;
    socket.join(roomId);
    console.log(`${user.name} joined room: ${roomId}`);

    try {
      const messages = await Chat.find({ room_id: roomId }).sort({ createdAt: 1 });
      console.log('Messages history:', messages);
      socket.emit('messageHistory', messages);
    } catch (err) {
      console.error('Error retrieving message history:', err);
    }
  });

  socket.on('message', ({ roomId, content }) => {
    const user = socket.handshake.query.user;
    console.log('Message received:', { roomId, user, content });
    const chatMessage = new Chat({ room_id: roomId, user_id: user._id, content });
    chatMessage.save().then(() => {
      console.log('Message saved to DB:', { user, content });
      io.to(roomId).emit('message', { user, content });
    }).catch(err => console.error('Error saving message to DB:', err));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


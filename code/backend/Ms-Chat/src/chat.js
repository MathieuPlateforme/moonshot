const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const Room = require('./models/Room.js');
const RoomMember = require('./models/RoomMember.js');
const UserTest = require('./models/UserTest.js');
const Chat = require('./models/Chat.js'); // Utilisation du modèle Chat

const app = express();
app.use(express.json());

// Configurer CORS pour autoriser l'en-tête Authorization
app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

mongoose.connect('mongodb://localhost/Chat')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/login', async (req, res) => {
  const { email, name } = req.body;
  let user = await UserTest.findOne({ email });
  if (!user) {
    user = new UserTest({ email, name });
    await user.save();
  }
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, 'your_jwt_secret');
  res.json({ token, user });
});

app.post('/rooms', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const room = new Room({ title, description });
  try {
    await room.save();
    res.json(room);
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/rooms', authenticateToken, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error('Error retrieving rooms:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/rooms/:roomId/members', authenticateToken, async (req, res) => {
  const { roomId } = req.params;
  const { userId, type } = req.body;
  const roomMember = new RoomMember({ room_id: roomId, user: userId, type });
  try {
    await roomMember.save();
    res.json(roomMember);
  } catch (err) {
    console.error('Error adding room member:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Voir les salles auxquelles l'utilisateur a accès
app.get('/my-rooms', authenticateToken, async (req, res) => {
  try {
    const rooms = await RoomMember.find({ user: req.user.id }).populate('room_id');
    res.json(rooms);
  } catch (err) {
    console.error('Error retrieving user rooms:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Chatter dans une salle
app.post('/rooms/:roomId/chats', authenticateToken, async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;
  const chat = new Chat({ ban_id: roomId, user_id: req.user.id, content });
  try {
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error('Error sending chat:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Récupérer les messages d'une salle
app.get('/rooms/:roomId/chats', authenticateToken, async (req, res) => {
  const { roomId } = req.params;
  try {
    const chats = await Chat.find({ ban_id: roomId });
    res.json(chats);
  } catch (err) {
    console.error('Error retrieving chats:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

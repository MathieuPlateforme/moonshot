const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');  // Importer le package cors

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5000", // Remplacez par votre origine si différente
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

const Room = require('./models/Room.js');
const RoomMember = require('./models/RoomMember.js');
const Chat = require('./models/Chat.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chat')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Utiliser le middleware cors pour permettre les requêtes cross-origin
app.use(cors({
  origin: "http://localhost:5000", // Remplacez par votre origine si différente
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser Helmet pour la sécurité avec CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "'unsafe-inline'"], // Autoriser data: et 'self' pour le favicon
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ roomId, user }) => {
        socket.join(roomId);
        console.log(`${user} joined room: ${roomId}`);
    });

    socket.on('message', ({ roomId, userId, content }) => {
        console.log('Message received:', { roomId, userId, content });
        const chatMessage = new Chat({ room_id: roomId, user_id: userId, content });
        chatMessage.save().then(() => {
            console.log('Message saved to DB:', { userId, content });
            io.to(roomId).emit('message', { userId, content });
        }).catch(err => console.error('Error saving message to DB:', err));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));






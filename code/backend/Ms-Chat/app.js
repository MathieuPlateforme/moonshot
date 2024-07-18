const createAuthServer = require('./temp-auth/auth');

// Démarrer le serveur d'authentification
createAuthServer(3000, 'your_secret_key');

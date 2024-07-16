const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

function createAuthServer(port = 3000, secretKey = 'your_secret_key') {
    const app = express();

    app.use(cors()); // Utiliser cors pour permettre les requêtes multiorigines
    app.use(bodyParser.json());

    // Endpoint pour l'authentification
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        // Vérifiez les informations d'identification
        if (username === 'oui' && password === 'oui') {
            // Créez un token JWT
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            return res.json({ token });
        }

        // Si les informations d'identification ne sont pas correctes
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    });

    // Middleware pour vérifier le token JWT
    const authenticateJWT = (req, res, next) => {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Token invalide' });
                }

                req.user = user;
                next();
            });
        } else {
            res.status(401).json({ message: 'Token manquant' });
        }
    };

    // Endpoint protégé par JWT
    app.get('/protected', authenticateJWT, (req, res) => {
        res.json({ message: 'Contenu protégé accessible', user: req.user });
    });

    app.listen(port, () => {
        console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
    });
}

module.exports = createAuthServer;

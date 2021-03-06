// Chargement du module 'http' et de app
const http = require('http');
const app = require('./app');
const db = require('./models/index');
require('dotenv').config();

// On s'assure que le port fourni est un nombre
const normalizePort = (val) => {
	const port = parseInt(val, 10); //on convertit la valeur en un entier

	if (isNaN(port)) {
		// Vérifie si la valeur n'est pas un nombre et retourne la valeur
		return val;
	}
	if (port >= 0) {
		// Vérifie s'il s'agit dune valeur de port valide
		return port;
	}
	return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Gestionnaire d'erreurs lors de l'appel des adresses
const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};
// Création du server
const server = http.createServer(app);

// Démarrage du server et message pour le port utilisé et synchro avec la BDD

db.sequelize.sync().then(function() {
	server.on('error', errorHandler);
	server.on('listening', () => {
		const address = server.address();
		const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
		console.log('Listening on ' + bind);
	});

	// On met le serveur en écoute du port (3000)
	server.listen(port);
	// la fonction setAdmin est appelée
	require('./config/admin');
});

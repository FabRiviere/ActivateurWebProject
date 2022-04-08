const JWT = require('jsonwebtoken');
const config = require('../config/config');

function issueJWT(user) {
	// on génére le token
	const id = user.id;
	const expiresIn = '86400';//24 hours
	const payload = {
		sub: id,
		iat: Date.now()
	};
	const signedToken = JWT.sign(payload, 'secret', { expiresIn: expiresIn });
	return {
		token: 'Bearer ' + signedToken,
		expires: expiresIn
	};
}
// on vérifie le userId du token
function getUserId(req) {
	// on récupère le token de la requête entrante
	const token = req.headers.authorization.split(' ')[1];
	// on le vérifie
	const decodedToken = JWT.verify(token, 'secret');
	// on récupère l'id du token
	const userId = decodedToken.sub;
	return userId;
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;

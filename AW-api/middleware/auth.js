const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		// on récupère le token de la requête entrante
		const token = req.headers.authorization.split(' ')[1];
		// on le vérifie
		const decodedToken = jwt.verify(token, 'secret');
		// on récupère l'id du token
		const userId = decodedToken.sub;
		if (req.body.userId && req.body.userId !== userId) {
			// on compare le userid de la requête à celui du token
			throw 'User id invalide !';
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: new Error('Requête invalide !') });
	}
};
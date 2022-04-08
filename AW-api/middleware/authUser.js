const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

exports.valid = (req, res, next) => {
	// on vérifie le password et l'email
	const passwordSchema = new passwordValidator();
	passwordSchema
		.is()
		.min(8) // Minimum 8 caractères
		.is()
		.max(20) // Maximum 20 caractères
		.has()
		.uppercase() // Doit contenir une majuscule minimum
		.has()
		.lowercase() // Doit contenir une minuscule minimum
		.has()
		.not()
		.symbols(); // Pas de symboles

	if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
		return res.status(400).send({
			error:
				'Merci de vérifier votre email, et votre mot de passe (composé de 8 caractères minimum avec des minuscules et majuscules)  '
		});
	} else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
		next();
	}
};
exports.checkPseudo = (req, res, next) => {
	// on vérifie le pseudo
	const regex = /^[a-zA-Z0-9_]{3,30}$/; // Lettres, espaces et doit être entre 4 et 30 caractères
	const pseudo = req.body.pseudo;
	if (regex.test(pseudo) === true) {
		next();
	} else {
		return res.status(400).send({
			error:
				'Le pseudo doit être de 3 caractères minimum et 30 maximum.Il accepte les lettres, chiffres et underscore (_)  '
		});
	}
};

const multer = require('multer');

const MIME_TYPES = {
	// notre dictionnaire d'extensions
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'image/x-icon': 'ico',
	'image/svg+xml': 'svg',
	'video/mpeg': 'mpeg',
	'video/ogg': 'ogv',
	'video/webm': 'webm',
	'video/3gpp': '3gp',
	'video/flv': 'flv',
	'video/mp4': 'mp4',
	'application/pdf': 'pdf',
	'application/zip': 'zip'
};

// Stockage pour les images
const imageStorage = multer.diskStorage({
	
	destination: (req, file, callback) => {
		
		callback(null,  'upload')
		
	},
	
	filename: (req, file, callback) => {
		// nouveau nom du fichier image pour éviter les doublons
		
		const name = file.originalname.replace(/\.[^/.]+$/, '');
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
		
	}
})


// stockage de l'image publiée

module.exports = multer({ storage: imageStorage}).single('file');


// fields([
// 	{ name: 'imageProjet', maxCount: 1 },
// 	{ name: 'videoProjet', maxCount: 1},
// 	{ name: 'imageUrl', maxCount: 1 },
// 	{ name: 'videoUrl', maxCount: 1},
// 	{ name: 'imageCert', maxCount: 1 },
// 	{ name: 'photo', maxCount: 1},
// 	{ name: 'langageLogo', maxCount: 1 },
// 	{ name: 'logo', maxCount: 1},
// ])







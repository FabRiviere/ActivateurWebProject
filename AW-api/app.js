require('dotenv').config();
const express = require('express');
const path = require('path');
// const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// ! Routes Importation
const categoriesRoutes = require('./routes/categories-router');
const certificatsRoutes = require('./routes/certificats-router');
const contactsRoutes = require('./routes/contacts-router');
const langagesRoutes = require('./routes/langages-router');
const portfoliosRoutes = require ('./routes/portfolios-router');
const postsRoutes = require('./routes/posts-router');
const tutorialsRoutes = require('./routes/tutorials-router');
const userRoutes = require('./routes/users-router');
const videosRoutes = require('./routes/videos-router');

// ! Database setup
const { sequelize } = require('./models/index');

const app = express();

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
// 	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type,Authorization');
// 	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
// 	res.setHeader('Access-Control-Allow-Credentials', true);	
// 	next();
// });

// ! Middleware Setup

app.use
	(cors({
	credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    origin: process.env.AUTHORIZED_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization", 'Origin, X-Requested-With, Content, Accept'],
    methods: ["GET", "POST", "PUT", "HEAD", "PATCH", "DELETE", "OPTIONS"],
	})
);
// Sécurisation des headers
// app.use(helmet())
app.use(helmet.frameguard( { action: "SAMEORIGIN" } ));
app.use(morgan('dev'));
app.use(cookieParser());




// Stockage du json web token coté frontend dans la session
app.use(
	session({ 
		secret: process.env.COOKIE_MDP, 
		resave: false, 
		saveUninitialized: false, 
		cookie: { 
			maxAge: 3600000, //cookie stocké pdt 60min(1h)
			sameSite: "none",
			secure: "true"
		},
		proxy: true
	})
);

// équivalent à bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default options
// app.use(fileUpload({ safeFileNames: true, preserveExtension: true, uriDecodeFileNames: true, debug: true, createParentPath: true }));
// On indique le repertoire images pour servir nos images

// ! Route static setup
app.use('/api/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/upload/LangageLogo', express.static(path.join(__dirname, 'upload/LangageLogo')));
app.use('/api/upload-pdf', express.static(path.join(__dirname, 'upload-pdf')));
app.use('/api/videos', express.static(path.join(__dirname, 'videos')));

// ! Route setup
app.use('/api/categories', categoriesRoutes);
app.use('/api/certificats', certificatsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/langages', langagesRoutes);
app.use('/api/portfolios', portfoliosRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/tutorials', tutorialsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videosRoutes);


// ! Database test connexion
const dbTest = async function() {
	try {
		await sequelize.authenticate();
		console.log('Connexion à la base de données réussie. 😉');
	} catch (error) {
		console.error('Impossible de se connecter à la base de données 😩', error);
	}
};
dbTest();

module.exports = app;

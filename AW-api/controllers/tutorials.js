const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");


exports.getAllTutorials = async (req, res) => {
    try {
        const tutorials = await db.Tutorial.findAll({
            attributes: [ "id","title", "content", "imageUrl", "videoUrl", "createdAt" ],
            order: [ [ "createdAt", "DESC" ] ],
            include: [
                {
                    model: db.User,
                    attributes: [ "pseudo", "id", "photo" ]
                },
                {
                    model: db.Category,
                    attributes: [ "id", "name", "logo" ]
                },
                {
                    model: db.Langage,
                    attributes: [ "id", "langageName", "langageLogo" ]
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                },
                {
                    model: db.Comment,
                    attributes: [ "message", "pseudo" ],
                    order: [ "createdAt", "DESC" ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo" ]
                        }
                    ]
                },
                {
                    model: db.Like,
                    attributes: [ "UserId" ]
                },
                {
                    model: db.Post,
                    attributes: [ "message", "UserId", "id" ],
                    order: [ [ "createdAt", "DESC" ] ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo"]
                        },  
                    ]
                },                
            ]
        });
        res.status(200).send(tutorials);
    } catch (error) {
        return res.status(500).send({
            error: "Une erreur est survenue lors du chargement des tutoriels ! 😩"
        });
    }
};
// Afficher les tutoriels par catégories
exports.getTutosByCategory = async (req, res) => {
    try {

        const Category = await db.Category.findOne({
            where: { id: req.params.id}
        })

        const tutorials = await db.Tutorial.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "imageUrl",
                "videoUrl",
                "createdAt",
            ],
            where: { CategoryId: Category.id },

            include: [
                {
                    model: db.User,
                    attributes: [ "pseudo", "id", "photo" ]
                },
                {
                    model: db.Category,
                    attributes: [ "id", "name", "logo" ]
                },
                {
                    model: db.Langage,
                    attributes: [ "id", "langageName", "langageLogo" ]
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                },
                {
                    model: db.Comment,
                    attributes: [ "message", "pseudo" ],
                    order: [ "createdAt", "DESC" ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo" ]
                        }
                    ]
                },
                {
                    model: db.Like,
                    attributes: [ "UserId" ]
                },
                {
                    model: db.Post,
                    attributes: [ "message", "UserId", "id" ],
                    order: [ [ "createdAt", "DESC" ] ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo"]
                        },
                        
                        {
                            model: db.Like,
                            attributes: [ "UserId" ]
                        }
                    ]
                }                
            ]
        });
        res.status(200).send(tutorials);
    } catch (error) {
        return res.status(500).send({
            error: "Une erreur est survenue lors du chargement des tutoriels ! 😩"
        });
    }
};


// Afficher les tutoriels les + "likés"

exports.getHotTutorials = async (req, res) => {
    try {
        const tutorials = await db.Tutorial.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "imageUrl",
                "videoUrl",
                "createdAt",
                [ db.sequelize.literal('(SELECT COUNT(*) FROM Likes WHERE Likes.TutorialId = Tutorial.id'), 'LikeCount' ]
            ],
            order: [ [ db.sequelize.literal('LikeCount'), 'DESC' ] ],

            include: [
                {
                    model: db.User,
                    attributes: [ "pseudo", "id", "photo" ]
                },
                {
                    model: db.Category,
                    attributes: [ "id", "name", "logo" ]
                },
                {
                    model: db.Langage,
                    attributes: [ "id", "langageName", "langageLogo" ]
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                },
                {
                    model: db.Comment,
                    attributes: [ "message", "pseudo" ],
                    order: [ "createdAt", "DESC" ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo" ]
                        }
                    ]
                },
                {
                    model: db.Like,
                    attributes: [ "UserId" ]
                },
                {
                    model: db.Post,
                    attributes: [ "message", "UserId", "id" ],
                    order: [ [ "createdAt", "DESC" ] ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo"]
                        },
                        
                        {
                            model: db.Like,
                            attributes: [ "UserId" ]
                        }
                    ]
                }                
            ]
        });
        res.status(200).send(tutorials);
    } catch (error) {
        return res.status(500).send({
            error: "Une erreur est survenue lors du chargement des tutoriels ! 😩"
        });
    }
};

exports.getOneTutorial = async (req, res) => {
    try {
        const tutorial = await db.Tutorial.findOne({
            // on récupére le tutoriel avec l'id en incluant les tables et attributs nécessaires
            where: { id: req.params.id },
            include: [
                {
                    model: db.User,
                    attributes: [ "pseudo", "id", "photo" ]
                },
                {
                    model: db.Category,
                    attributes: [ "id", "name", "logo" ]
                },
                {
                    model: db.Langage,
                    attributes: [ "id", "langageName", "langageLogo" ]
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                },
                {
                    model: db.Comment,
                    attributes: [ "message", "pseudo" ],
                    order: [ "createdAt", "DESC" ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo" ]
                        }
                    ]
                }, 
                {
                    model: db.Like,
                    attributes: [ "UserId" ]
                },  
                {
                    model: db.Post,
                    attributes: [ "message", "UserId", "id" ],
                    order: [ [ "createdAt", "DESC" ] ],
                    include: [
                        {
                            model: db.User,
                            attributes: [ "photo", "pseudo"]
                        },
                        
                        
                        {
                            model: db.Like,
                            attributes: [ "UserId" ]
                        }
                    ]
                },
                             
            ]
        });
        res.status(200).json(tutorial);
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
};

 exports.createTutorial = async (req, res) => {
    const userId = token.getUserId(req);
    let imageUrl;
    try {
        const user = await db.User.findOne({
            attributes: [ "pseudo", "id", "photo" ],
            where: { id: userId }
        })
        if (user !== null) {
            if(req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
            } else {
                imageUrl = null;
            };         
            const tutorial = await db.Tutorial.create({
                title: req.body.title,
                content: req.body.content,
                imageUrl: imageUrl,
                videoUrl:req.body.videoUrl,
                CategoryId: req.body.Category_id,
                LangageId: req.body.Langage_id,
                UserId: userId,
                include: [
                    {
                        model: db.User,
                        attributes: [ "pseudo", "id", "photo" ]
                    },
                    {
                        model: db.Category,
                        attributes: [ "name", "id", "logo"]
                    },
                    {
                        model: db.Langage,
                        attributes: [ "id","langageName", "langageLogo"]
                    },
                    {
                        model: db.Video,
                        attributes: [ "id","title", "videoUrl", "duration", "poster"]
                    }
                ]
            })           
            res.status(201).send({ tutorial: tutorial, messageRetour: "Votre tutoriel est en ligne ! 😉" });
        } else {
            res.status(400).send({ error: "Erreur ! 😩" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur de la part du serveur ! 😩" });
    }
};



exports.deleteTutorial = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({ where: { id: userId } });
        if (userId === tutorial.UserId || checkAdmin.admin === true) {
            if (tutorial.imageUrl) {
                const filename = tutorial.imageUrl.split('/upload')[1];
                fs.unlink(`upload/${filename}`, () => {
                    db.Tutorial.destroy({ where: { id: tutorial.id } });
                    res.status(200).json({ message: "Tutoriel supprimé ! 😉" });
                });
            } else {
                db.Tutorial.destroy({ where: { id: tutorial.id } }, { truncate: true });
                res.status(200).json({ message: "Tutoriel supprimé ! 😉" });
            }
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce tutoriel ! 🤨" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
};

exports.updateTutorial = async (req, res) => {
    try {
        let newImageUrl;
        const userId = token.getUserId(req);
        let tutorial = await db.Tutorial.findOne({ where: { id: req.params.id } });
        
        if (userId === tutorial.UserId) {
            if(req.file) {
                newImageUrl = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
                if(tutorial.imageUrl) {
                    const filename =tutorial.imageUrl.split('/upload')[1];
                    fs.unlink(`upload/${filename}`, (err) => {
                        if(err) console.log(err);
                        else {
                            console.log(`Delete file: upload/${filename}`);
                        }
                    });
                }
            }
            if (req.body.title) {
                tutorial.title = req.body.title;
            }
            if (req.body.content) {
                tutorial.content = req.body.content;
            }
            tutorial.CategoryId = req.body.Category_id,
            tutorial.LangageId = req.body.Langage_id,
            tutorial.Video = req.body.video
            tutorial.imageUrl = newImageUrl;
            const newTutorial = await tutorial.save({
                fields: [ "title", "content", "imageUrl", "videoUrl", "CategoryId","LangageId" ]
            });
            res.status(200).json({ newTutorial: newTutorial, messageRetour: "Tutoriel modifié ! 😉" });
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour modifier ce tutoriel ! 🤨" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
};

exports.likeTutorial = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const tutorialId = req.params.id;
        const user = await db.Like.findOne({
            where: { UserId: userId, TutorialId: tutorialId },
        });
        if (user) {
            await db.Like.destroy(
                { where: { UserId: userId, TutorialId: tutorialId } },
                { truncate: true, restartIdentity: true }
            );
            res.status(200).send({ messageRetour: "Vous n'aimez plus ce tutoriel ! 💔" });
        } else {
            await db.Like.create({
                UserId: userId,
                TutorialId: tutorialId
            })
            res.status(200).json({ messageRetour: "Vous aimez ce tutoriel ! ❤️‍🔥" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
};

exports.addComment = async (req, res) => {
	try {
		const comment = req.body.commentMessage;
		const pseudo = req.body.commentPseudo;
		const newComment = await db.Comment.create({
			message: comment,
			pseudo: pseudo,
			UserId: token.getUserId(req),
			TutorialId: req.params.id
		})

		res.status(201).json({ newComment, messageRetour: 'votre commentaire est publié' });
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};
exports.deleteComment = async (req, res) => {
	try {
		const userId = token.getUserId(req);
		const checkAdmin = await db.User.findOne({ where: { id: userId } });
		const comment = await db.Comment.findOne({ where: { id: req.params.id } });

		if (userId === comment.UserId || checkAdmin.admin === true) {
			db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
			res.status(200).json({ message: 'commentaire supprimé' });
		} else {
			res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce commentaire" });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};



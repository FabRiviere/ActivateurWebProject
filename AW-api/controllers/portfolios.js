const token = require("../middleware/token");
// const fileUpload = require('express-fileupload');
const db = require("../models");
const fs = require("fs");

exports.createPortfolio = async (req, res) => {
    const userId = token.getUserId(req);
    let videoProjet;
    // let videoPath;
    let imageProjet;
    // let imagePath;
    
    try {
        const user = db.User.findOne({
            attributes: [ 'id', 'pseudo', 'photo'],
            where: { id: userId }
        })
        if (user != null ) {

            // if(req.file) {
             
            //     imageProjet = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`                         
                
            // } else {
                
            //     imageProjet = null;
            // } 

            if(req.file) {
            
                videoProjet = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`                         
            
            } else {
                
                videoProjet = null;
            } 
                              
            const portfolio = await db.Portfolio.create({
               
                projet: req.body.projet,
                contenu: req.body.contenu,                              
                videoProjet: videoProjet,
                imageProjet: imageProjet,
                urlProjet: req.body.urlProjet,
                UserId: userId,
                LangageId: req.body.Langage_id,
                CategoryId: req.body.Category_id,
                        
                
                include: [
                    
                    {
                        model: db.Video,
                        attributes: [ "title", "videoUrl", "duration", "poster"]
                    },
                    {
                        model: db.User,
                        attributes: [ "pseudo", "id", "photo" ]
                    },
                    {
                        model: db.Category,
                        attributes: [ "id", "name", "logo"]
                    },
                    {
                        model: db.Langage,
                        attributes: ["id", "langageName"]
                    },
                    
                    
                ],
                
            })
                         
            res.status(201).json({ portfolio: portfolio, messageRetour: "Votre projet est en ligne ! 😉"  })
                    
        } else {
            res.status(400).send({ error: "Erreur ! 😩" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur de la part du serveur ! 😩" });
    }
};

exports.getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await db.Portfolio.findAll({
            attributes: [ 'id', 'projet', 'contenu', 'imageProjet', 'videoProjet' ],
            include: [
                {
                    model: db.User,
                    attributes: [ 'pseudo', 'id', 'photo' ]
                },
                {
                    model: db.Category,
                    attributes: [ 'id', 'name', "logo"]
                },
                {
                    model: db.Langage,
                    attributes: [ 'id', 'langageName', 'langageLogo']
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                }
            ]
        });
        res.status(200).send(portfolios);

    } catch (error) {
        return res.status(500).send({
			error: 'Une erreur est survenue lors du chargement des projets '
		});
    }
};

exports.getOnePortfolio = async (req, res) => {
    try {
        const portfolio = await db.Portfolio.findOne({
            where: { id: req.params.id },
            attributes: [ 'id', 'projet', 'contenu', 'imageProjet', 'videoProjet' ],
            include: [
                {
                    model: db.User,
                    attributes: [ 'pseudo', 'id', 'photo' ]
                },
                {
                    model: db.Category,
                    attributes: [ 'id', 'name', 'logo']
                },
                {
                    model: db.Langage,
                    attributes: [ 'id', 'langageName', 'langageLogo']
                },
                {
                    model: db.Video,
                    attributes: [ "id", "videoUrl", "poster", "title", "duration" ]
                }

            ],
            
        });
        res.status(200).send(portfolio);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur' });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({
            where: { id: userId }
        });
        const portfolio = await db.Portfolio.findOne({ 
            where: { id: req.params.id }
        });
        if (userId === portfolio.UserId || checkAdmin.admin === true) {
            if (portfolio.videoProjet) {
                const filename = portfolio.videoProjet.split('/upload')[1];
                fs.unlink(`upload/${filename}`, () => {
                    db.Portfolio.destroy({ where: { id: portfolio.id } });
                    res.status(200).json({ message: 'Projet supprimé' });
                })
            } else {
                db.Portfolio.destroy({ where: { id: portfolio.id } }, { truncate: true });
                res.status(200).json({ message: 'Projet supprimé' });
            }
            
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce projet" });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur' });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        let newVideoProjet;
        // let newVideoProjet;
        const userId = token.getUserId(req);
        let portfolio = await db.Portfolio.findOne({
            where: { id: req.params.id}
        });
        if (userId === portfolio.UserId) {
            if (req.file) {
                newVideoProjet = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
                if (portfolio.VideoProjet) {
                    const filename = portfolio.VideoProjet.split('/upload') [1];
                    fs.unlink(`upload/${filename}`, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log(`Deleted file: upload/${filename}`);
                        }
                    })
                }
            }
            // if (req.file) {
            //     newVideoProjet = `${req.protocol}://${req.get('host')}/api/videos/${req.file.filename}`;
            //     if (portfolio.videoProjet) {
            //         const filename = portfolio.videoProjet.split('/videos') [1];
            //         fs.unlink(`videos/${filename}`, (err) => {
            //             if (err) console.log(err);
            //             else {
            //                 console.log(`Deleted file: videos/${filename}`);
            //             }
            //         })
            //     }             
            // }
            if (req.body.projet) {
                portfolio.projet = req.body.projet
            }
            if (req.body.contenu) {
                portfolio.contenu = req.body.contenu
            }
            if (req.body.Langage_id) {
                portfolio.LangageId = req.body.Langage_id;
            }
            if (req.body.Category_id) {
                portfolio.CategoryId = req.body.Category_id;
            }
            // if (req.body.Video_id) {
            //     portfolio.VideoId = req.body.Video_id;
            // }
            // imageProjet = newImageProjet;
            videoProjet = newVideoProjet;
            const newPortfolio = await portfolio.save({
                fields: [ 'projet', 'contenu', 'imageProjet', 'videoProjet', 'VideoId', 'CategoryId', 'LangagesId', 'UserId']
            });
            res.status(200).json({ newPortfolio: newPortfolio, messageRetour: 'Projet modifié' });
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce projet" });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur' });
    }
}
const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");

exports.createCertificat = async (req, res) => {
    const userId = token.getUserId(req);
    let imageCert;
    
    try {
        const user = await db.User.findOne({
            attributes: [ 'pseudo', 'id', 'photo' ],
            where: { id: userId }
        });
        
        if (user !== null) {
            if (req.file) {
                imageCert = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
            } else {
                imageCert = null;
            }
            const certificat = await db.Certificat.create({
                include: [
                   {
                        model: db.User,
                        attributes: [ 'pseudo', 'id', 'photo' ]
                    },
                    {
                        model: db.Langage,
                        attributes: [ 'id', 'langageName', 'langageLogo']
                    },
                    {
                        model: db.Category,
                        attributes: [ 'id', 'name', 'logo']
                    },
                    {
                        model: db.Portfolio,
                        attributes: [ 'id', 'projet']
                    }
                ],
                label: req.body.label,
                organisme: req.body.organisme,
                fichierUrl: req.body.fichierUrl,
                nbreHeures: req.body.nbreHeures,
                imageCert: imageCert,
                UserId: userId, 
                LangageId: req.body.Langage_id,
                CategoryId: req.body.Category_id,
                PortfolioId: req.body.Portfolio_id          
        
            })
            res.status(201).json({ certificat: certificat, messageRetour: "Votre document est ajouté" });
        } else {
            res.status(400).send({ error: 'Erreur' });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.getAllCertificats = async (req, res) => {
    try {
        const certificats = await db.Certificat.findAll({
            attributes: [
                'id',
                'label',
                'organisme',
                'imageCert',
                'fichierUrl',
                'nbreHeures'
            ],
            include: [
                {
                    model: db.Langage,
                    attributes: [ 'id', 'langageName', 'langageLogo']
                },
                {
                    model: db.Category,
                    attributes: [ 'id', 'name', 'logo']
                },
                {
                    model: db.Portfolio,
                    attributes: ['id', 'projet']
                },
                {
                    model: db.User,
                    attributes: [ 'id', 'pseudo']
                }
            ]
        })
        res.status(200).send(certificats);
    } catch (error) {
        return res.status(500).send({
            error: "Une erreur est survenu lors de la récupération des certificats "
        });
    }
};

exports.getOneCertificat = async (req, res) => {
    try {
        const certificat = await db.Certificat.findOne({
            where: { id: req.params.id },
            attributes: [
                'id',
                'label',
                'organisme',
                'imageCert',
                'fichierUrl',
                'nbreHeures'
            ],
            include: [
                {
                    model: db.User,
                    attributes: [ 'id', 'pseudo']
                },
                {
                    model: db.Langage,
                    attributes: [ 'id', 'langageName', 'langageLogo']
                },
                {
                    model: db.Category,
                    attributes: [ 'id', 'name', 'logo']
                },
                {
                    model: db.Portfolio,
                    attributes: ['id', 'projet']
                }
            ]
            
        })
        
        res.status(200).send(certificat);
    } catch (error) {
        return res.status(500).send({
            error: "Erreur Serveur "
        });
    }
};

exports.deleteCertificat = async (req, res) => {
    try {
        
        const certificat = await db.Certificat.findOne({
            where: { id: req.params.id }
        });
        if (certificat.imageCert) {
            const filename = certificat.imageCert.split('/upload') [1];
            fs.unlink(`upload/${filename}`, () => {
                db.Certificats.destroy({ where: { id: certificat.id } });
                res.status(200).json({ message: "Certificat supprimé" });
            })
        } else {
            db.Certificat.destroy({ where: {id: certificat.id } }, { truncate: true });
            res.status(200).json({ message: "Certificat supprimé" });
        }

    } catch (error) {
        return res.status(500).send({ error: 'Erreur Serveur'});
    }
};

exports.updateCertificat = async (req, res) => {
    try {
        let newImageCert;
        const userId = token.getUserId(req);
        let certificat = await db.Certificat.findOne({
            where: { id: req.params.id }
        });
        if (userId === certificat.UserId) {
            if (req.file) {
                newImageCert = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
                if (certificat.imageCert) {
                    const filename = certificat.imageCert.split('/upload')[1];
                    fs.unlink(`upload/${filename}`, (err) => {
                        if (err) { 
                            console.log(err)
                        }
                        else {
                            console.log(`Delete file: upload/${filename}`);
                        }
                    })
                }
            } 
            if (req.body.label) {
                certificat.label = req.body.label
            }
            if (req.body.organisme) {
                certificat.organisme = req.body.organisme
            }
            if(req.body.fichierUrl) {
                certificat.fichierUrl = req.body.fichierUrl
            }
            if(req.body.nbreHeures) {
                certificat.nbrHeures = req.body.nbreHeures
            }
            if(req.body.Langage_id) {
                certificat.LangageId = req.body.Langage_id
            }        
            if(req.body.Category_id) {
                certificat.CategoryId = req.body.Category_id
            }        
            if(req.body.Portfolio_id) {
                certificat.PortfolioId = req.body.Portfolio_id
            }        
            certificat.imageCert = newImageCert;

            const newCertificat = await certificat.save({
                fields: [ 'label', 'organisme','imageCert', 'fichierUrl', 'nbrHeures', 'PortfolioId', 'LangageId', 'CategoryId']
            })
            res.status(200).json({ newCertificat: newCertificat, messageRetour: 'Certificat modifié'})
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce certificat" });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur'})
    }
};
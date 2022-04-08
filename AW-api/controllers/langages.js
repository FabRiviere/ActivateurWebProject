const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");


exports.getAllLangages = async (req, res) => {
    try {
        const langages = await db.Langage.findAll({
            attributes: ["id", "langageName", "langageLogo"],
            include: {
                model: db.User,
                attributes: ['id', 'pseudo']
            }
        })
        res.status(200).json(langages)
    } catch (error) {
        return res.status(500).send({
            error: "Erreur lors du chargement des langages"
        })
    }
};

exports.getOneLangage = async (req, res) => {
    try {
        const langage = await db.Langage.findOne({
            where: { id: req.params.id },
            attributes: ["id", "langageName", "langageLogo" ],
            include: {
                model: db.User,
                attributes: ['id', 'pseudo']
            }
        })
        res.status(200).send(langage)
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" })
    }
}

exports.createLangage = async (req, res) => {
    const userId = token.getUserId(req);
    let langageLogo;
    try {
        const user = db.User.findOne({
            attributes: ['id', 'pseudo'],
            where: { id: userId }
        })
        if (user !== null) {
            if (req.file) {
                langageLogo = `${req.protocol}://${req.get('host')}/api/upload/LangageLogo/${req.file.filename}`
            } else {
                langageLogo = null;
            }
            const langage = await db.Langage.create({
                langageName: req.body.langageName,
                langageLogo: langageLogo,
                UserId: userId
            })
            res.status(200).send({ langage: langage, message: "Nouveau langage créé" })
        } else {
            res.status(400).send({ error: "Erreur ! 😩" });
        }

    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur lors de la création du langage" })
    }
}

exports.deleteLangage = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({
            where: { id: userId }
        });
        const langage = await db.Langage.findOne({ 
            where: { id: req.params.id }
        });
        if (userId === langage.UserId || checkAdmin.admin === true) {
            if (langage.langageLogo) {
                const filename = langage.langageLogo.split('/upload/LangageLogo')[1];
                fs.unlink(`upload/LangageLogo/${filename}`, () => {
                    db.Langages.destroy({ where: { id: langage.id } });
                    res.status(200).json({ message: 'Langage supprimé' });
                })
            } else {
                db.Langage.destroy({ where: { id: langage.id } }, { truncate: true });
                res.status(200).json({ message: 'Langage supprimé' });
            }
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce langage" });
        } 
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
}
const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await db.Category.findAll({
            attributes: [ "id", "name", "logo"],
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'pseudo']
                },
                {
                    model: db.Tutorial,
                    attributes: [ 'id', 'title','content', 'imageUrl', 'videoUrl']
                }
            ]
        })
        res.status(200).json(categories)
    } catch (error) {
        return res.status(500).send({ 
            error: "Erreur lors du chargement des catégories"
        })
    }
};

exports.getOneCategory = async (req, res) => {
    try {
        const category = await db.Category.findOne({
            where: { id: req.params.id },
            attributes: [ "id", "name", "logo"],
            include: [
                {
                model: db.User,
                attributes: ['id', 'pseudo']
                },
                {
                    model: db.Tutorial,
                    attributes: [ 'id', 'title','content', 'imageUrl', 'videoUrl']
                }
            ]
        })
        res.status(200).send(category)
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩"})
    }
}

exports.createCategory = async (req, res) => {
    const userId = token.getUserId(req);
    let logo;
    try {
        const user = db.User.findOne({
            attributes: ['id', 'pseudo'],
            where: { id: userId }
        })
        if (user !== null) {
            if (req.file) {
               logo = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`
            } else {
                logo = null;
            }
            const category = await db.Category.create({
                name: req.body.name,
                logo: logo,
                UserId: userId
            })
            res.status(200).send({ category: category, message: "Nouvelle catégorie créée" })
        } else {
            res.status(400).send({ error: "Erreur ! 😩" });
        }

    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur lors de la création de la catégorie" })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({
            where: { id: userId }
        });
        const category = await db.Category.findOne({ 
            where: { id: req.params.id }
        });
        if (userId === category.UserId || checkAdmin.admin === true) {
            if (category.logo) {
                const filename = category.logo.split('/upload')[1];
                fs.unlink(`upload/${filename}`, () => {
                    db.Category.destroy({ where: { id: category.id } });
                    res.status(200).json({ message: 'Catégorie supprimée' });
                })
            } else {
                db.Category.destroy({ where: { id: category.id } }, { truncate: true });
                res.status(200).json({ message: 'Categorie supprimé' });
            }
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer cette catégorie" });
        } 
    } catch (error) {
        return res.status(500).send({ error: "Erreur du serveur ! 😩" });
    }
}
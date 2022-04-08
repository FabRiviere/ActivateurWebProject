const db = require('../models');
const token = require('../middleware/token');

exports.createContact = async (req, res) => {
    try {
        const contact = await db.Contact.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        })
        res.status(200).json({ contact: contact, messageRetour: 'Votre message a été crée 🧧' });

    }catch(error) {
        return res.status(500).json({ error: 'Erreur du serveur'})
    }
}

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await db.Contact.findAll({
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phone',
                'subject',
                'message'
            ],
            order: [ [ 'createdAt', 'DESC' ] ]
        })
        res.status(200).json(contacts)
    } catch(error) {
        return res.status(500).send({ error: 'Erreur lors du chargement des messages' })
    }
}

exports.getOneContact = async (req, res) => {
    try {
        const contact = await db.Contact.findOne({ 
            where: { id: req.params.id }
        })
        res.status(200).send(contact)
    } catch (error) {
        return res.status(500).send({ error: 'Erreur du serveur'})
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({ where: { id: userId } });
        const contact = await db.Contact.findOne({ where: { id: req.params.id } });
        if (checkAdmin.admin === true) {
            db.Contact.destroy({ where: { id: contact.id } }, { truncate: true } );
            res.status(200).json({ message: 'Email contact supprimé !'});
        } else {
            res.status(401).json({ message: 'Autorisation refusée pour supprimer ce message'});
        }
    } catch(error) {
        return res.status(500).send({ error:'Erreur du serveur'});
    }
}

// ! Pour envoi formulaire par email

// exports.emailContacts = async (req, res) => {

//     // ! pour gmail : 
//     // const transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     auth: {
//     //         user: 'fab.solo58@gmail.com',
//     //         pass: 'password'
//     //     }
//     // })
//     // const mailOptions = {
//     //     from: req.body.email,
//     //     to: 'fab.solo58@gmail.com',
//     //     subject: `Message from ${req.body.email}: ${req.body.subject}`,
//     //     text: req.body.message
//     // }

//     // ! pour nom de domaine
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.hostinger.com',
//             port: 725,
//             // secure: true,
//             auth: {
//                 user: process.env.USERMAILER,
//                 pass: process.env.USERPASS
//             }
//         })


//     const mailOptions = {
//         from: req.body.email,
//         to: 'fabien@activateurweb.com',
//         subject: `Message from ${req.body.email}: ${req.body.subject}`,
//         text: req.body.message
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//        if(error) {
//            console.log(error);
//            res.send('error');
//        }else {
//            console.log('Email sent: ' + info.response);
//            res.send('success')
//        }
//     })
// } 
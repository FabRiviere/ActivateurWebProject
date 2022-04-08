const router = require('express').Router();
const auth = require('../middleware/auth');
const contactsCtrl = require('../controllers/contacts');

router.post('/add', contactsCtrl.createContact);
router.get('/', contactsCtrl.getAllContacts);
router.get('/:id', contactsCtrl.getOneContact);
router.delete('/:id', auth, contactsCtrl.deleteContact);

module.exports = router;
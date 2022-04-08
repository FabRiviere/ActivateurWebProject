const router = require('express').Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const langagesCtrl = require('../controllers/langages')

router.get('/', multer, langagesCtrl.getAllLangages);
router.get('/:id', langagesCtrl.getOneLangage);
router.post('/add', auth, multer,  langagesCtrl.createLangage);
router.delete('/:id', auth,  langagesCtrl.deleteLangage);

module.exports = router;
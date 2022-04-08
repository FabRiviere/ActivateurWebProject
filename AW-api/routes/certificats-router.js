const router = require('express').Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const certificatsCtrl = require("../controllers/certificats");

router.get('/',  certificatsCtrl.getAllCertificats);
router.post('/add', auth, multer, certificatsCtrl.createCertificat);
router.get('/:id',  certificatsCtrl.getOneCertificat);
router.put('/:id/update', auth, multer, certificatsCtrl.updateCertificat)
router.delete('/:id',auth, certificatsCtrl.deleteCertificat);

module.exports = router;
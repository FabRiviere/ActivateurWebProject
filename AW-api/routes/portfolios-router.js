const router = require('express').Router();
const portfoliosCtrl = require ('../controllers/portfolios');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// const multer = require('multer');
// const Upload = multer({ dest: 'uploads_portfolios/'})



router.post('/add', auth, multer, portfoliosCtrl.createPortfolio);
router.get('/', portfoliosCtrl.getAllPortfolios);
router.get('/:id', portfoliosCtrl.getOnePortfolio);
router.put('/:id/update', auth, multer, portfoliosCtrl.updatePortfolio);
router.delete('/:id/delete', auth, portfoliosCtrl.deletePortfolio);

module.exports = router;

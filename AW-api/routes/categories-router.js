const router = require('express').Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const CategoriesCtrl = require('../controllers/categories');

router.get('/',  CategoriesCtrl.getAllCategories);
router.get('/:id',  CategoriesCtrl.getOneCategory);
router.post('/add', auth, multer, CategoriesCtrl.createCategory);
router.delete('/:id',auth, multer, CategoriesCtrl.deleteCategory);

module.exports = router;
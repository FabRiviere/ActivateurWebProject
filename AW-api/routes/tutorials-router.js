const router = require('express').Router();
const tutorialsCtrl = require("../controllers/tutorials");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", tutorialsCtrl.getAllTutorials);
router.get("/hot", auth, tutorialsCtrl.getHotTutorials);
router.get("/cat/:id", tutorialsCtrl.getTutosByCategory);
router.post("/add", auth, multer, tutorialsCtrl.createTutorial);
router.get("/:id", auth, tutorialsCtrl.getOneTutorial);
router.put("/:id/update", auth, multer, tutorialsCtrl.updateTutorial);
router.delete("/:id", auth, multer, tutorialsCtrl.deleteTutorial);
router.post("/:id/like", auth, tutorialsCtrl.likeTutorial);
router.post("/:id/comments", auth, tutorialsCtrl.addComment)
router.delete("/comments/:id", auth, tutorialsCtrl.deleteComment);

module.exports = router;
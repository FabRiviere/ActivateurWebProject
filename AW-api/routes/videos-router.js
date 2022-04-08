const router = require('express').Router();
const videoCtrl = require("../controllers/video");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// const fs = require("fs");
// const path = require('path')
// const formidable = require('formidable');

router.get("/", videoCtrl.getAllVideos);
router.get("/:id", videoCtrl.getOneVideo);
router.post("/add", auth, multer, videoCtrl.createVideo)

module.exports = router;
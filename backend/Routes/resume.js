const express = require('express');
const router = express.Router();
const Resumecontroller = require('../controllers/resume.js');
const {upload} = require('../utils/multer.js');

router.post('/addResume',upload.single("resume"), Resumecontroller.addResume);

module.exports = router;
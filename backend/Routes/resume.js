const express = require('express');
const router = express.Router();
const Resumecontroller = require('../controllers/resume.js');
const {upload} = require('../utils/multer.js');



router.post('/addResume', upload.single("resume"), Resumecontroller.addResume);
router.post('/buildResume', Resumecontroller.buildResume);
router.get('/get/:user', Resumecontroller.getallresumeforuser);
router.get('/get', Resumecontroller.getResumeforadmin);
module.exports = router;
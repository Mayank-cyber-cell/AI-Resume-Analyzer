const mongoose = require('mongoose');
  
const resumeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    resume_name: {
        type: String,
        required: true
    },
    job_desc: {
        type: String,
        required: true
    },
    score: {
        type: Number,
    },
    feedback: {
        type: String,
    }
},{timestamps: true});

const resumeModel = mongoose.model('Resume', resumeSchema);

module.exports = resumeModel;

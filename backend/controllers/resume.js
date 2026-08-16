const ResumeModel = require('../models/resume.js');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
    token: "wPVRSFBH19KQ2jxnQeZOMkRVG5zkK7IRT3WN28lD",
});

exports.addResume = async (req, res) => {
    try {
        const { job_desc, user } = req.body;
        // console.log(req.file);
        // console.log( job_desc, user);

        const pdfBuffer = req.file.buffer || null;
        const pdfPath = req.file.path;
        const fs = require('fs');
        const databuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(databuffer);

        const prompt = `
            You are a resume screening assistant.
            Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback.

            Resume:
            ${pdfData.text}

            Job Description: 
            ${job_desc}

            Return the score and a brief explanation in this format:
            Score: XX
            Reason: ...

            `
            ;
        const response = await cohere.generate({
            model: "command",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
        });

        let result = response.generations[0].text;
        // console.log(result)

        const match = result.match(/Score:\s*(\d+)/);
        const score = match ? parseInt(match[1], 10) : null;

        const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
        const reason = reasonMatch ? reasonMatch[1].trim() : null;

        const newResume = new ResumeModel({
            user,
            resume_name: req.file.originalname,
            job_desc,
            score,
            feedback: reason
        });

        await newResume.save();

        fs.unlinkSync(pdfPath); // remove temp file

        res.status(200).json({ message: "Your analysis are ready", data: newResume });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
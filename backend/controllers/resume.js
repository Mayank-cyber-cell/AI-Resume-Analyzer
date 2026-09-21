const ResumeModel = require('../models/resume.js');
const pdfParse = require('pdf-parse');
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
    token: "wPVRSFBH19KQ2jxnQeZOMkRVG5zkK7IRT3WN28lD",
});

exports.addResume = async (req, res) => {
    try {
        const { job_desc, user } = req.body;

        const fs = require('fs');
        const pdfPath = req.file.path;
        const databuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(databuffer);

        const prompt = `You are a resume screening assistant.
Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback.

Resume:
${pdfData.text}

Job Description:
${job_desc}

Return the score and a brief explanation in this format:
Score: XX
Reason: ...`;

        const chatResponse = await cohere.chat({
            model: "command-r-plus",
            message: prompt,
            temperature: 0.7,
        });

        let result = chatResponse.text;

        const match = result.match(/Score:\s*(\d+)/);
        const score = match ? parseInt(match[1], 10) : null;

        const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
        const reason = reasonMatch ? reasonMatch[1].trim() : result.trim();

        const newResume = new ResumeModel({
            user,
            resume_name: req.file.originalname,
            job_desc,
            score,
            feedback: reason
        });

        await newResume.save();

        fs.unlinkSync(pdfPath);

        res.status(200).json({ message: "Your analysis is ready", data: newResume });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getallresumeforuser = async (req, res) => {
    try {
        const { user } = req.params;
        let resumes = await ResumeModel.find({ user }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Resumes retrieved successfully", resumes: resumes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getResumeforadmin = async (req, res) => {
    try {
        let resumes = await ResumeModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Resumes retrieved successfully", resumes: resumes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.buildResume = async (req, res) => {
    try {
        const { user, details } = req.body;

        const prompt = `You are an expert ATS-friendly resume writer.
Using the following details, create a clean, professional, ATS-optimized resume in plain text.
Use standard section headings: Professional Summary, Work Experience, Education, Skills, Projects.
Use action verbs and quantify achievements where possible. Do not use tables or columns.

Details:
${JSON.stringify(details, null, 2)}`;

        const chatResponse = await cohere.chat({
            model: "command-r-plus",
            message: prompt,
            temperature: 0.6,
        });

        const resumeText = chatResponse.text.trim();

        const newResume = new ResumeModel({
            user,
            resume_name: details.name ? `${details.name} - ATS Resume` : "ATS Resume",
            job_desc: "ATS-friendly resume build",
            score: null,
            feedback: resumeText
        });

        await newResume.save();

        res.status(200).json({ message: "ATS resume generated successfully", data: newResume, resumeText });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

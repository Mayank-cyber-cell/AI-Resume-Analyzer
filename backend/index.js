const express = require("express");
const app = express();
const PORT = 4000;


require("./connection.js");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Analyzer backend is running",
    endpoints: ["/api/user", "/api/resume"],
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const UserRoutes = require("./Routes/user.js");
const ResumeRoutes = require("./Routes/resume.js");


app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);


app.listen(PORT, () => {
  console.log("Server is running on port ",PORT);
});

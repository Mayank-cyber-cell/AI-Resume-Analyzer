const express = require("express");
const app = express();
const PORT = 4000;


require("./connection.js");
app.use(express.json());

const userRoutes = require("./Routes/user.js");

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port ",PORT);
});
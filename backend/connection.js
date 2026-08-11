const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://jimayank2105_db_user:PFgNQGEFy1HWD4wW@cluster0.gzvidcv.mongodb.net/?appName=Cluster0").then((res) => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("Error connecting to database:", err);
});

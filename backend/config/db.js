const mongoose = require("mongoose");


function connectDB() {
    mongoose.connect(process.env.example.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected ✅");
    });
}
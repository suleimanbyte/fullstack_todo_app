const express = require("express");
const cors = require("cors")
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./config/db")
const todoRouter = require("./routes/todo")

// connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.use("/todos", todoRouter);


app.listen(PORT, () => {
    console.log(PORT)
    console.log("Server running on ", PORT)
})




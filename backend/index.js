const express = require("express");
require("dotenv").config();
const PORT = process.env.example.PORT;
const { connecDB } = require("./config/db")

connecDB();
const app = express();
app.use(express.json());


app.listen(PORT, () => {
    console.log("Server running on ", PORT)
})




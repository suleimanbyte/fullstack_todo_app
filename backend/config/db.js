const mongoose = require("mongoose");


function connectDB() {
    mongoose.connect(process.env.example.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected ✅");
    });
}

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userTodo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
})

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const User = mongoose.model("User", UserSchema)
const Todo = mongoose.model("Todo", TodoSchema)


module.exports = {
  User,
  Todo,
  connectDB,
};
const mongoose = require("mongoose");


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected using Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
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
  completed: Boolean
},
{
  timestamps: true
}
);

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema)


module.exports = {
  User,
  Todo,
  connectDB,
};
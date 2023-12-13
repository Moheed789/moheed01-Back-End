require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
const connectDB = require("./db/database");

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
});
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/task");

const app = express();

app.use(express.json());
app.use("/api/v1/task", tasksRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is working on ${process.env.PORT}`);
    })
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})
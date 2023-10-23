require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const studentsRouter = require("./routres/studentroute");

const app = express();

app.use(express.json());
app.use("/api/student", studentsRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT , () => {
        console.log(`Server is running a ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error)
})
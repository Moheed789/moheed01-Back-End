require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRouter");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to Database")
    app.listen(process.env.PORT, () => {
        console.log(`Server is running a ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
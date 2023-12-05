require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const colorRouter = require("./routes/color.route");

const app = express();

app.use(express.json());
app.use("/color/v1", colorRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    });
    console.log("Database Connected");
}).catch((err) => {
    console.log(err)
});

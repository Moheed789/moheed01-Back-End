require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
    res.send("Moheed.com")
});

app.get("/login", (req, res) => {
    res.send("<h1>Please login at page</h1>")
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listen on port ${process.env.PORT}`);
});
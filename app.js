const express = require("express");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use("/", authRouter);

module.exports = app;
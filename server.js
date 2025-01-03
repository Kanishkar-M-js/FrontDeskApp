const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get("/", (request, response) => {
    response.json({ message: "Hello World!" });
});

app.listen(3001, () => {
    console.log("Server is running @ http://localhost:3001");
});

mongoose
    .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
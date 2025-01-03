const express = require("express");

const authRouter = express.Router();

authRouter.get("/", (request, response) => {
  response.json({ message: "Hello World!" });
});

module.exports = authRouter;
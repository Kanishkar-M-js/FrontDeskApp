const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");
const app = require("./app");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to Database");

    app.listen(PORT, () => {
      console.log("Server is running @ http://localhost:3001");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

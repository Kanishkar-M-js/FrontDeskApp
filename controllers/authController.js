const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const authController = {
  register: async (request, response) => {
    try {
      // get the details from request body
      const { name, email, password } = request.body;
      // check if user already exists
      const user = await User.findOne({ email });
      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password : hashedPassword,
      });
      await newUser.save();
      response.status(201).json({ message: "User created successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  login: async (request, response) => {
    try {
      // get the details from request body
      const { email, password } = request.body;
      // check if user already exists
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User does not exist" });
      }
      // check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(400).json({ message: "Invalid credentials" });
      }
      // create a token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {expiresIn: "3h"});
      
      response.cookie("token", token, { httpOnly: true });

      response.status(200).json({ message: "Login successful"});

    } catch (error) { 
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;

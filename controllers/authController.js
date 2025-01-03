const { response, request } = require("express");

const authController = {
    register: async (request, response) => {
        try {
             response.json({ message: "Hello World!" });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = authController;
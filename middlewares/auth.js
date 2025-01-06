const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');

const auth = {
    checkAuth: (request, response, next) => {
        const token = request.cookies.token;
       
        if (!token) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            request.userId = decoded.id;
            next();
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }

    }
};

module.exports = auth;

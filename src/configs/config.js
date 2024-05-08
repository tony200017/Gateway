// config.js
require("dotenv").config(); // Load environment variables from .env file

const config = {
  mongodbConnectionLink: process.env.MONGODB_CONNECTION_LINK,
  jwtSecret: process.env.GATEWAY_JWT_SECRET,
  port:3000,
  apiUrl : "http://localhost:3001/api/users/verify-token"
};

module.exports = config;

require('dotenv').config()

// Database Credentials
const dbCredentials = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

module.exports = dbCredentials;
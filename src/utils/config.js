require('dotenv').config()

const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

module.exports = {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME
}

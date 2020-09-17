require('dotenv').config()

module.exports = {
  mongoUrl: process.env.MONGODB || 'mongodb://localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}

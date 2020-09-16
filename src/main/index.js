require('dotenv').config()

const MongoHelper = require('../infra/helpers/mongo-helper')

const port = process.env.PORT
const db = process.env.MONGODB

MongoHelper.connect(db)
  .then(() => {
    const app = require('./config/app')

    app.listen(port, () => {
      console.log(`Server Running on port ${port}...`)
    })
  })
  .catch(console.error)

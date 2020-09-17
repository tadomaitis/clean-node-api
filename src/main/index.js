// require('dotenv').config()
const env = require('./config/env')

const MongoHelper = require('../infra/helpers/mongo-helper')

const port = env.port
const db = env.mongoUrl

MongoHelper.connect(db)
  .then(() => {
    const app = require('./config/app')

    app.listen(port, () => {
      console.log(`Server Running on port ${port}...`)
    })
  })
  .catch(console.error)

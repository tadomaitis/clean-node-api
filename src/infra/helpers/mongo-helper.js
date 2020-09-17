const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  },

  async disconnect () {
    await this.client.close()
    this.db = null
  },

  async getCollection (name) {
    if (!this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.db.collection(name)
  }
}

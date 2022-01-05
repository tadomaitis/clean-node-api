const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const MissingParamamError = require('../../utils/errors/missing-param-error')
let userModel

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const userToBeInserted = {
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    }
    const insertedUser = await userModel.insertOne(userToBeInserted)
    const userToBeCompared = await sut.load('valid_email@mail.com')
    expect(userToBeCompared).toEqual({
      _id: insertedUser.insertedId,
      password: userToBeInserted.password
    })
  })

  test('Should throw if no e-mail is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new MissingParamamError('email'))
  })
})

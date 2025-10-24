import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { registerReqBody } from '~/models/requests/User.requests'

class UsersServices {
  async register(payload: registerReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    return result
  }

  async checkEmailExist(email: string) {
    const isEmailExist = await databaseService.users.findOne({ email })
    return Boolean(isEmailExist)
  }
}

const usersServices = new UsersServices()

export default usersServices

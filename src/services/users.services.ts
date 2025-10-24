import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { registerReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/untils/crypto'
import { signToken } from '~/untils/jwt'
import { TokenType } from '~/constants/enum'

class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      }
    })
  }
  async register(payload: registerReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
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

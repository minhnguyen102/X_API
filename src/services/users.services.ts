import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { registerReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/untils/crypto'
import { signToken } from '~/untils/jwt'
import { TokenType } from '~/constants/enum'
import ms from 'ms'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/Errors'
import USER_MESSAGES from '~/constants/message'
import HTTP_STATUS from '~/constants/httpStatus'

class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      optionals: {
        expiresIn: process.env.EXPIRES_ACCESS_TOKEN as ms.StringValue
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      optionals: {
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN as ms.StringValue
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async register(payload: registerReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toString()
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accessToken,
      refreshToken
    }
  }

  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accessToken,
      refreshToken
    }
  }

  async checkEmailExist(email: string) {
    const isEmailExist = await databaseService.users.findOne({ email })
    return Boolean(isEmailExist)
  }
}

const usersServices = new UsersServices()

export default usersServices

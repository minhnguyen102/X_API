import { error } from 'console'
import jwt, { SignOptions } from 'jsonwebtoken'
import { reject } from 'lodash'
import { resolve } from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const signToken = ({
  payload,
  privateKey = process.env.PRIVATE_KEY_SIGNTOKEN as string,
  optionals = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  optionals?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, optionals, function (err, token) {
      if (err) {
        throw reject(err)
      }

      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.PRIVATE_KEY_SIGNTOKEN as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decode) => {
      if (error) {
        const err = new ErrorWithStatus({
          message: error.message,
          status: HTTP_STATUS.UNAUTHORIZED
        })
        return reject(err)
      }
      resolve(decode as jwt.JwtPayload)
    })
  })
}

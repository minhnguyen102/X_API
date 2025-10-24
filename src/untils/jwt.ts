import jwt, { SignOptions } from 'jsonwebtoken'
import { resolve } from 'path'

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

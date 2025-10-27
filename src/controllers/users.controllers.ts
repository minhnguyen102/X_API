import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import USER_MESSAGES from '~/constants/message'
import { registerReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import usersServices from '~/services/users.services'

export const loginController = async (req: Request, res: Response) => {
  throw new Error('Loi that roi anh oi')
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersServices.login(user_id.toString())
  res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const result = await usersServices.register(req.body)
  res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

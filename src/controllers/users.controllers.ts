import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { registerReqBody } from '~/models/requests/User.requests'
import usersServices from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'benten@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login Success'
    })
  }
  return res.status(400).json({
    message: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  try {
    const result = await usersServices.register(req.body)
    res.json({
      message: 'Register Success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'Register Failed'
    })
  }
}

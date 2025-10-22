import { Request, Response } from "express"
import User from "~/models/schemas/user.schema"
import databaseService from "~/services/database.services"
import usersServices from "~/services/users.services"

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if(email === 'benten@gmail.com' && password === '123456'){
    return res.json({
      message: 'Login Success'
    })
  }
  return res.status(400).json({
    message: 'Login failed'
  })
}

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const result = await usersServices.register({ email, password })
    res.json({
      message: 'Register Success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'Register Failed',
    })
  }
}

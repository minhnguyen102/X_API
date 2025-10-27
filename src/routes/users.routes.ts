import { NextFunction, Router, Request, Response } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/validation.middlewares'
import { wrapHandlerFunction } from '~/untils/wrapHandler'
const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)

/**
 * Description: Register a new user
 * PATH: /users/register
 * Method: Post
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
userRouter.post('/register', registerValidator, wrapHandlerFunction(registerController))

export default userRouter

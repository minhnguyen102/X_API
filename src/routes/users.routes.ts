import { NextFunction, Router, Request, Response } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/validation.middlewares'
import { wrapHandlerFunction } from '~/untils/wrapHandler'
const userRouter = Router()

/**
 * Description: Login
 * PATH: /users/login
 * Method: Post
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapHandlerFunction(loginController))

/**
 * Description: Register a new user
 * PATH: /users/register
 * Method: Post
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
userRouter.post('/register', registerValidator, wrapHandlerFunction(registerController))

/**
 * Description: Register a new user
 * PATH: /users/logout
 * Method: Post
 * Body: { refresh_token: string}
 * Headers: {Authorization: Bearer access_token}
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapHandlerFunction(logoutController))

export default userRouter

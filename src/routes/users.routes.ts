import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/validation.middlewares'
const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', loginValidator, registerController)

export default userRouter

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

// userRouter.post(
//   '/register',
//   registerValidator,
//   async (req: Request, res: Response, next: NextFunction) => {
//     // Cách xử lý của version 4
//     try {
//       console.log('Request Handler 1')
//       // next(new Error('Loi roi'))
//       throw new Error('LOI roi')
//     } catch (error) {
//       next(error)
//     }
//     // throw new Error('Loi roi') // express v5.1 : Chỉ cần throw lỗi mặc dù đó là trong hàm async function
//   },
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log('Request Handler 2')
//     next()
//   },
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log('Request Handler 3')
//     res.json({
//       message: 'Ok'
//     })
//   },
//   (err: any, req: Request, res: Response, next: NextFunction) => {
//     console.log(err)
//     res.status(400).json({
//       err: err.message
//     })
//   }
// )

export default userRouter

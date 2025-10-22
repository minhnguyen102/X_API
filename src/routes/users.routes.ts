import { Router } from 'express'
import { loginValidator } from '~/middlewares/validation.middlewares'
const userRouter = Router()

userRouter.post('/login', loginValidator, (req, res) => {
  const { email, password } = req.body
  if(email === 'benten@gmail.com' && password === '123456'){
    return res.json({
      message: 'Login Success'
    })
  }
  return res.status(400).json({
    message: 'Login failed'
  })
})

export default userRouter

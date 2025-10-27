import express, { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import userRouter from '~/routes/users.routes'
import HTTP_STATUS from './constants/httpStatus'
const app = express()
const port = 3000
app.use(express.json())
app.use('/users', userRouter)
databaseService.connect().catch(console.dir)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error:', err.message)
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

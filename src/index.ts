import express from 'express'
import databaseService from '~/services/database.services'
import userRouter from '~/routes/users.routes'
const app = express()
const port = 3000
app.use(express.json())
app.use('/users', userRouter)
databaseService.connect().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

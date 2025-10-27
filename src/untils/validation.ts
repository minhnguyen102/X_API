import express from 'express'
import { body, ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import ms from 'ms'
import HTTP_STATUS from '~/constants/httpStatus'
import ErrorWithStatus from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)
    // Nếu không có lỗi
    if (errors.isEmpty()) {
      return next()
    }
    const errorsObject = errors.mapped()
    console.log(errorsObject)
    // Nếu có lỗi (Lỗi 422: Validation hoặc lỗi khác 422)
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        console.log('Vao day')
        throw new ErrorWithStatus(msg)
      }
    }

    res.status(422).json({ errors: errorsObject })
  }
}

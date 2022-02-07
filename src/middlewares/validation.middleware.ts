import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { Request, RequestHandler } from "express"
import { HttpException } from "../exceptions/http.exception"

const validationMiddleware = (type: any, value: string = 'body'): RequestHandler => {
  return (req: any, res: any, next: any) => {
    validate(plainToInstance(type, req[value])).then(
      (errors) => {
        if(errors.length > 0) {
          const message = errors.map(error => Object.values(error.constraints)).join(', ')
          next(new HttpException(400, message))
        } else {
          next()
        }
      }
    )
  }
}

export default validationMiddleware
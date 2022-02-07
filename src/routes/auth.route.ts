import { Router } from "express"

import AuthController from "../controllers/auth.controller"
import { CreateUserDto } from "../dtos/user.dto"
import validationMiddleware from "../middlewares/validation.middleware"

class AuthRoute {
  private path = '/auth'
  private router = Router()
  private authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signup)
    this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto, 'body'), this.authController.login)
  }
}

export default AuthRoute
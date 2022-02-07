import { User } from ".prisma/client";
import { NextFunction, Request, Response } from "express";

import { CreateUserDto } from "../dtos/user.dto";
import AuthService from "../services/auth.service";

class AuthController {
  private authService = new AuthService()

  public signup = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const signupUserData: User = await this.authService.signup(userData)
      //hmmm, this the proper way of doing it ?
      delete signupUserData.password
      res.status(200).json({data: signupUserData, message: 'signup'})
    } catch (error) {
      next(error)
    }
  }

  public login = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const {token, findUser}: {token: string, findUser: User} = await this.authService.login(userData)
      // TODO: this is ok ? who kwnows ?!!?
      delete findUser.password
      res.status(200).json({data: {token, findUser}, message: 'login'})
    } catch (error) {
      next(error)      
    }
  }
}


export default AuthController
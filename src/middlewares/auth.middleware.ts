import { NextFunction, Request, Response } from "express";
import config from 'config'
import { verify } from "jsonwebtoken";

import { HttpException } from "../exceptions/http.exception";
import { logger } from "../utils/logger";

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  try {
    const authToken = authorization.split('Bearer ')[1]
    if (authToken) {
      const { secretKey } = config.get('jwt')
      const verificationResponse = verify(authToken, secretKey)
    } else {
      next(new HttpException(401, 'Authentification token missing'))
    }
    next()
  } catch (error) {
    logger.error(error)
    next(new HttpException(401, 'Wrong authentification token'))
  }
}

export default authMiddleware
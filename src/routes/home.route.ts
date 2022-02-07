import { Router } from 'express'

import HomeController from '../controllers/home.controller'
import authMiddleware from '../middlewares/auth.middleware'

class HomeRoute {
  public path = '/home'
  public router = Router()
  public homeController = new HomeController()
  
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.homeController.index)
  }
}

export default HomeRoute
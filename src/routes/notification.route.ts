import { Router } from 'express'

import NotificationController from '../controllers/notification.controller'
import authMiddleware from '../middlewares/auth.middleware'

class NotificationRoute {
  private path = '/notification'
  private router = Router()
  private notificationController = new NotificationController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notificationController.getNotifications)
    this.router.get(`${this.path}/account/:idUserTelegram`, authMiddleware, this.notificationController.getNotificationsByAccount)
    this.router.get(`${this.path}/run-notifications/:notification`, this.notificationController.runNotifications)
  }
}

export default NotificationRoute
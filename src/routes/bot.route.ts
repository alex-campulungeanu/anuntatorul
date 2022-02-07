import { Router, Request, Response } from 'express'
import BotService from '../services/bot.service'
import BotController from '../controllers/bot.controller'

class BotRoute {
  public path = '/telebot'
  public router = Router()
  public telegramService = new BotService()
  public botController = new BotController()
  
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // TODO: delete this route
    this.router.get(`${this.path}/message`,  async (req: any, res: any) => {
      const message = req.body.message
      const bot = this.telegramService.createBot()
      // bot.telegram.sendMessage(<telegram id user>, `new format: ${message}`)
      res.status(200).send("Message sent")
    })

    this.router.post(`${this.path}/setWH`, this.botController.setWebHook)
  }
}

export default BotRoute
import {Request, Response} from 'express'
import config from 'config'

import BotService from '../services/bot.service'
import { logger } from '../utils/logger'


class BotController {
  private botService = new BotService()

  public index = (req: Request, res: Response): void => {
    res.json("This is from home botController -> bot route")
  }

  public setWebHook = async (req: Request, res: Response) => {
    const { url } = config.get('server')
    const { secretHash }: any = config.get('telegram')
    const BASE_PATH = url
    const bot = this.botService.createBot()
    this.botService.initBot(bot)
    // TODO: maybe i need to move this into a service
    try {
      // Retrieve the POST request body that gets sent from Telegram
      const { body, query } = req

      if (query.setWebhook === "true") {
        logger.info('serverbot query.setWebhook === "true"')
        const webhookUrl = `${BASE_PATH}/server/telebot/setWH?secret_hash=${secretHash}`

        // Would be nice to somehow do this in a build file or something
        const isSet = await bot.telegram.setWebhook(webhookUrl)
        logger.info(`Set webhook to ${webhookUrl}: ${isSet}`)
      }

      if (query.secret_hash === secretHash) {
        logger.info('serverbot query.secret_hash === SECRET_HASH')
        await bot.handleUpdate(body)
      }
    } catch (error) {
      // If there was an error sending our message then we
      // can log it into the Vercel console
      logger.error("[+] setWebHook -> Error sending message")
      logger.error(error)
      return res.status(500).send("Cannot set webhook !")
    }

    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    // The message here doesn't matter.
    return res.status(200).send("Webhook set !")
  }

}

export default BotController
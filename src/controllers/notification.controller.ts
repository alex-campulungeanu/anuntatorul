import {NextFunction, Request, Response} from 'express'

import NotificationService, { NotificationWithAccounts } from '../services/notification.service'
import AccountService from '../services/account.service'
import BotService from '../services/bot.service'
import { Notification } from '../interfaces/notification.interface'
import { getLastInfluenserFun } from '../notifications/influenser-fun'
import { Postlist } from '../notifications/influenser-fun'
import { constants } from '../configs/constants'
import { logger } from '../utils/logger'


class NotificationController {
  private notificationService = new NotificationService()
  private accountService = new AccountService()
  private botService = new BotService()


  public index = (req: Request, res: Response): void => {
    res.json("This is from notification controller -> notification route")
  }

  public getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllNotificationsData: Notification[] = await this.notificationService.findAllNotifications()
      res.status(200).json({data: findAllNotificationsData, message: 'findAll'})
    } catch (error) {
      next(error)
    }
  }
  
  public getNotificationsByAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const idUserTelegram = req.params.idUserTelegram
    try {
      const findNotificationByAccount: Notification[] = await this.notificationService.findNotificationByAccount(Number(idUserTelegram))
      res.status(200).json({data: findNotificationByAccount, message: 'findNotificationByAccount'})
    } catch (error) {
      next(error)
    }
  }

  // TODO: maybe i need to create a separate controller for runnig notifications
  public runNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const notification = req.params.notification
    try {
      if (notification !== '') {
        const findNotificationByName: NotificationWithAccounts = await this.notificationService.findNotificationByName(notification)
        switch(findNotificationByName.name) {
          case constants.notificationName.influenser:
            let lastInfluenserUrl: string = ''
            const influenserUrlList: Postlist[] = await getLastInfluenserFun()
            for (let element of influenserUrlList) {
              if(element.url.includes('https://zoso.ro/stirile-zilei')) {
                lastInfluenserUrl = element.url
                break
              }
            }
            const bot = this.botService.createBot()
            // notify the account and update the database
            // TODO: reformat this
            for await (const notif of findNotificationByName.accounts) {
              await this.accountService.updateNotificationValidationData(notif.accountId, notif.notificationId, lastInfluenserUrl)
              bot.telegram.sendMessage(notif.account.idChatTelegram, `A aparut influenser FUN !`)
            }
            break
          default:
            logger.info(`Sorry, we are out of ${findNotificationByName.name}.`);
        }
      }
      res.status(200).json({data: '', message: 'runNotifications'})
    } catch (error) {
      next(error)
    }
  }

}

export default NotificationController
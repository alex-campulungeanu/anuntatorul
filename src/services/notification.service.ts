import { PrismaClient, Notification, Account } from "@prisma/client"

import { HttpException } from "../exceptions/http.exception"
import { CreateNotificationDto } from '../dtos/notification.dto'
import { Prisma } from '@prisma/client'


const notificationWithAccounts = Prisma.validator<Prisma.NotificationArgs>() ({
  include: {
    accounts: {
      include: {
        account: true        
      }
    }
  }
})

export type NotificationWithAccounts = Prisma.NotificationGetPayload<typeof notificationWithAccounts>

class NotificationService {
  private prisma = new PrismaClient()
  private notification = this.prisma.notification
  private account = this.prisma.account

  public async findAllNotifications(): Promise<Notification[]> {
    const allNotifications: Notification[] = await this.notification.findMany()
    return allNotifications
  }

  public async findNotificationById(notificationId: number): Promise<Notification> {
    const notification: Notification = await this.notification.findUnique({where: {id: notificationId}})
    if (!notification) {
      // TODO: thow a proper exception here
      throw new HttpException(404, `Your notification ${notificationId} was not found`);
    }
    return notification
  }

  public async findNotificationByName(name: string): Promise<NotificationWithAccounts> {
    const notification: NotificationWithAccounts = await this.notification.findUnique(
      {
        where: {name: name},
        include: {
          accounts: {
            include: {
              account: true
            }
          }
        }
      }
    )
    if (!notification) {
      // TODO: thow a proper exception here
      throw new HttpException(404, `Your notification ${name} was not found`);
    }
    return notification
  }

  public async findNotificationByAccount(idUserTelegram: number): Promise<Notification[]> {
    const account: Account = await this.account.findUnique({where: {idUserTelegram: idUserTelegram}})
    if (!account) {
      // TODO: thow a proper exception here
      throw new HttpException(404, `Your account ${idUserTelegram} was not found`);
    }
    const notification: Notification[]  = await this.notification.findMany({
      include: {
        accounts: {
          where: {
            accountId: account.id
          }
        }
      }
    })
    return notification
  }

  public async createNotification(notificationData: CreateNotificationDto): Promise<Notification> {
    const findNotification: Notification = await this.notification.findUnique({where: {name: notificationData.name}})
    if (findNotification) {
      throw new HttpException(409, `Your notification ${notificationData.name} already exists`);
    }
    const createNotificationData: Notification = await this.notification.create({data: notificationData})
    return createNotificationData
  }

}

export default NotificationService

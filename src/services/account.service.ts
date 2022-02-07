import { PrismaClient, Account, AccountNotification } from "@prisma/client"

import { HttpException } from "../exceptions/http.exception"
import { CreateAccountDto } from '../dtos/account.dto'
import { logger } from '../utils/logger'

class AccountService {
  private account = new PrismaClient().account
  private accountNotification = new PrismaClient().accountNotification

  public async findAllAccounts(): Promise<Account[]> {
    const allAccounts: Account[] = await this.account.findMany()
    return allAccounts
  }

  public async findAccountById(accountId: number): Promise<Account> {
    const account: Account = await this.account.findUnique({where: {id: accountId}})
    if (!account) {
      // TODO: thow a proper exception here
      throw new HttpException(404, `Your account ${accountId} was not found`);
    }
    return account
  }

  public async findAccountByIdUserTelegram(idUserTelegram: number): Promise<Account>{
    const account: Account = await this.account.findUnique(
      {
        where: {idUserTelegram: idUserTelegram},
        include: {
          notifications: {
            include: {
              notification: {
                select: {
                  id: true,
                  name: true,
                  label: true
                }
              }
            }
          },
        },
      }
    )
    if (!account) {
      // TODO: thow a proper exception here
      throw new HttpException(404, `Your telegram account ${idUserTelegram} was not found`);
    }
    return account
  }

  public async createAccount(accountData: CreateAccountDto): Promise<Account> {
    const findAccount: Account = await this.account.findUnique({where: {idUserTelegram: accountData.idUserTelegram}})
    if (findAccount) throw new HttpException(409, `Your account ${accountData.idUserTelegram} already exists`);
    const createAccountData: Account = await this.account.create({data: accountData})
    return createAccountData
  }

  public async updateAccountById(accountId: number, accountData: CreateAccountDto): Promise<Account> {
    const updateAccountData: Account = await this.account.update({
      where: {id: accountId},
      data: accountData
    })
    return updateAccountData
  }

  public async updateAccountByIdUserTelegram(idUserTelegram: number, accountData: CreateAccountDto): Promise<Account> {
    try {
      const updateAccountData: Account = await this.account.update({
        where: {idUserTelegram: idUserTelegram},
        data: accountData
      })
      return updateAccountData
    } catch (error) {
      throw new HttpException(404, `The account ${accountData.idUserTelegram} not exists`)
    }
  }

  public async addNotification(accountId: number, notificationId: number) {
    const createAccountNotification = await this.accountNotification.create({
      data: {
        accountId: accountId,
        notificationId: notificationId
      }
    })
    return createAccountNotification
  }

  public async addOrDeleteNotification(idUserTelegram: number, notificationId: number): Promise<AccountNotification> {
    // TODO: for sure there is a smarter solution for this, it works for now
    const account: Account = await this.account.findUnique({where: {idUserTelegram: idUserTelegram}})
    const findAccountNotification = await this.accountNotification.findUnique({
      where: {
        accountId_notificationId: {
          accountId: account.id,
          notificationId: notificationId
        }
      }
    })
    if (!findAccountNotification) {
      const createAccountNotification = await this.accountNotification.create({
        data: {
          accountId: account.id,
          notificationId: notificationId
        }
      })
      return createAccountNotification
    } else {
      const deleteAccountNotification = await this.accountNotification.delete({
        where: {
          accountId_notificationId: {
            accountId: account.id,
            notificationId: notificationId
          }
        }
      })
      return deleteAccountNotification
    }

    // return 'ok'
  }

  public async updateNotificationValidationData(accountId: number, notificationId: number, validationData: string): Promise<void> {
    const updateAccountNotification = await this.accountNotification.update({
      where: {
        accountId_notificationId: {
          accountId: accountId,
          notificationId: notificationId
        }
      },
      data: {
        validationData: validationData
      }
    })
    logger.info(updateAccountNotification)
  }

}

export default AccountService

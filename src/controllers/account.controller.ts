import {NextFunction, Request, Response} from 'express'

import accountService from '../services/account.service'
import { Account } from '../interfaces/account.interface'
import { CreateAccountDto, CreateAccountNotificationDto } from '../dtos/account.dto'

class AccountController {
  private accountService = new accountService()

  public index = (req: Request, res: Response): void => {
    res.json("This is from account controller -> account route")
  }

  public getAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAccountsData: Account[] = await this.accountService.findAllAccounts()
      res.status(200).json({data: findAllAccountsData, message: 'findAll'})
    } catch (error) {
      next(error)
    }
  }

  public getAccountByIdUserTelegram = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const idUserTelegram: number = Number(req.params.idUserTelegram)
    try {
      const findAccountByIdUserTelegram: Account = await this.accountService.findAccountByIdUserTelegram(idUserTelegram)
      res.status(200).json({data: findAccountByIdUserTelegram, message: 'findByIdUserTelegram'})
    } catch (error) {
      next(error)
    }
  }

  public createAccount = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountData = req.body
      const createAccountData: CreateAccountDto = await this.accountService.createAccount(accountData)
      res.status(200).json({data: createAccountData, message: 'created'})
    } catch (error) {
      next(error)
    }
  }

  public updateAccountById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountId: number = Number(req.params.id)
      const accountData: CreateAccountDto = req.body
      const updateAccountData: Account = await this.accountService.updateAccountById(accountId, accountData)
      res.status(200).json({ data: updateAccountData, message: 'updated' });
    } catch (error) {
      next(error)
    }
  }

  public addNotification = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountNoficationData: CreateAccountNotificationDto = req.body
      const createAccountNoficationDataData: CreateAccountNotificationDto = await this.accountService.addNotification(accountNoficationData.accountId, accountNoficationData.notificationId)
      res.status(200).json({data: createAccountNoficationDataData, message: 'notificationAssigned'})
    } catch (error) {
      next(error)
    }
  }

  public addOrDeleteNotification = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accountNoficationData: CreateAccountNotificationDto = req.body
      const createAccountNoficationDataData: CreateAccountNotificationDto = await this.accountService.addOrDeleteNotification(accountNoficationData.accountId, accountNoficationData.notificationId)
      res.status(200).json({data: createAccountNoficationDataData, message: 'notificationUpdated'})
    } catch (error) {
      next(error)
    }
  }
}

export default AccountController
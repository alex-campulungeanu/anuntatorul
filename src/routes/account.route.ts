import { Router } from 'express'
import AccountController from '../controllers/account.controller'

class AccountRoute {
  private path = '/account'
  private router = Router()
  private accountController = new AccountController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.accountController.getAccounts)
    this.router.get(`${this.path}/id-user-telegram/:idUserTelegram`, this.accountController.getAccountByIdUserTelegram)
    this.router.post(`${this.path}`, this.accountController.createAccount)
    // TODO: validation for :id parametor to have only numeric values /:id(\\d+)
    this.router.put(`${this.path}/:id`, this.accountController.updateAccountById)
    this.router.post(`${this.path}/notification`, this.accountController.addNotification)
    this.router.patch(`${this.path}/notification`, this.accountController.addOrDeleteNotification)
  }
}

export default AccountRoute
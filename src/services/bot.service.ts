import { Scenes, Telegraf, session, Markup} from "telegraf"
import { Context } from "telegraf/typings/context"
import config from 'config'
import HttpsProxyAgent from 'https-proxy-agent'

import AccountService from '../services/account.service'
import * as commands from '../bot/commands'
import notificationsScene from '../bot/scenes/notification'
import startScene from '../bot/scenes/start'
import { logger } from "../utils/logger"

class BotService {
  private accountService = new AccountService()
  
  public createBot(): Telegraf {
    const { apiKey, secretHash }: any = config.get('telegram')
  
    let telegramOptions: any = {
      telegram: {           // Telegram options
        // agent: new HttpsProxyAgent(conf.http),        // https.Agent instance, allows custom proxy, certificate, keep alive, etc.
        // webhookReply: true  // Reply via webhook
      }
    }
    let http: string = ''
    if (config.has('proxy')) {
      const conf: any = config.get('proxy')
      http = conf.http
      telegramOptions.telegram.agent = new HttpsProxyAgent(conf.http)
    } 
    const bot = new Telegraf(apiKey, telegramOptions)
    return bot
  }

  //  TODO: this function is invoked on every message, maybe i can call it only when webhook is set
  public initBot(bot: Telegraf) {
    const { enter } = Scenes.Stage
    const stage = new Scenes.Stage<Scenes.SceneContext>([
      notificationsScene,
      startScene,
    ])
    bot.use(session());
    bot.use(stage.middleware())
    bot.start(async (ctx: any) => ctx.scene.enter('start'));
    this.assignBotCommands(bot)

    bot.command('/notifications', async (ctx: any) => {
      await ctx.scene.enter('notifications')
    })
    
    // i cannot add the action to the scene, so i need to add it on the bot instance
    bot.action(/subscribeNotification/, async (ctx, next) => {
      const accountId: number = ctx.from.id
      const notificationId: number = JSON.parse(ctx.match.input).p.id
      await this.accountService.addOrDeleteNotification(accountId, notificationId)
      return ctx.reply('Subscriptions succesfully !').then(() => next())
    })

    // bot.catch((error: any) => {
    //   logger.error('Global error has happened, %O', error);
    // });
  }

  public assignBotCommands(bot: Telegraf) {
    bot.command("connect", async (ctx: Context) => {
      await commands.handleConnectCommand(ctx)
    })
    bot.command("update", async (ctx: Context) => {
      await commands.handleUpdateCommand(ctx)
    })
    bot.command("info", async (ctx: Context) => {
      await commands.handleInfoCommand(ctx)
    })
    bot.command("test", async (ctx: Context) => {
      await commands.handleTestCommand(ctx)
    })
    bot.on("message", async (ctx: Context) => {
      await commands.handleOnMessage(ctx)
    })
  }

}

export default BotService
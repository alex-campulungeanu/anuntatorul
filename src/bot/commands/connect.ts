import { Context } from 'telegraf'
import { CreateAccountDto } from "../../dtos/account.dto"
import AccountService from '../../services/account.service'
import { logger } from '../../utils/logger'

export async function  handleConnectCommand(ctx: Context) {
  const accountService = new AccountService()
  // TODO: maybe this should be put in a function, it's duplicated in multiple places
  const idUserTelegram: number = ctx.from.id
  const idChatTelegram: number = ctx.chat.id
  const userTelegram: string = ctx.from.username
  const name: string = ctx.from.first_name || ctx.from.last_name
  const accountCreate: CreateAccountDto = {idChatTelegram, idUserTelegram, userTelegram, name}
  try {
    await accountService.createAccount(accountCreate)
    await ctx.reply("Connected !", {
      reply_to_message_id: ctx.message.message_id,
    })
  } catch (error) {
    if (error.status == 409) {
      await ctx.reply("Already connected !", {
        reply_to_message_id: ctx.message.message_id,
      })
    } else {
      logger.error(error)
      await ctx.reply("Unable to connect !", {
        reply_to_message_id: ctx.message.message_id,
      })
    }
  }
}
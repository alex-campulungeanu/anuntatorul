import { Context } from 'telegraf'
import { CreateAccountDto } from "../../dtos/account.dto"
import AccountService from '../../services/account.service'

export async function  handleUpdateCommand(ctx: Context) {
  const idUserTelegram: number = ctx.from.id
  const idChatTelegram: number = ctx.chat.id
  const userTelegram: string = ctx.from.username
  const name: string = ctx.from.first_name || ctx.from.last_name
  const accountCreate: CreateAccountDto = {idChatTelegram, idUserTelegram, userTelegram, name}
  const accountService = new AccountService()
  try {
    await accountService.updateAccountByIdUserTelegram(idUserTelegram, accountCreate)
    await ctx.reply("Updated !", {
      reply_to_message_id: ctx.message.message_id,
    })
  } catch (error) {
    if (error.status == 404) {
      await ctx.reply("First you need to /connect !", {
        reply_to_message_id: ctx.message.message_id,
      })      
    } else {
      await ctx.reply("Unable to update !", {
        reply_to_message_id: ctx.message.message_id,
      })         
    }
  }
}
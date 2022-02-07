import { Context } from 'telegraf'

export async function handleInfoCommand(ctx: Context) {
  const idUserTelegram: number = ctx.from.id
  const idChatTelegram: number = ctx.chat.id
  const userTelegram: string = ctx.from.username
  const name: string = ctx.from.first_name || ctx.from.last_name
  const replyInfo: string = `
    user: ${idUserTelegram}
    user_name: ${userTelegram}
    name: ${name}
    chat: ${idChatTelegram}
  `
  await ctx.reply(replyInfo, {
    reply_to_message_id: ctx.message.message_id,
  }) 
}
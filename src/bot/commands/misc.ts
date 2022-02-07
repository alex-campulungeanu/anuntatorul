import { Context } from 'telegraf'
import { logger } from '../../utils/logger'

export async function handleTestCommand(ctx: Context) {
  const COMMAND = "/test"
  const { message } = ctx
  
  let reply = "Hello there! This is a test command"
  
  const didReply = await ctx.reply(reply, {
    reply_to_message_id: message?.message_id,
  })
  
  if (didReply) {
    logger.info(`Reply to ${COMMAND} command sent successfully.`)
  } else {
    console.error(
      `Something went wrong with the ${COMMAND} command. Reply not sent.`
    )
  }
}

export async function handleOnMessage(ctx: Context) {
  const { message } = ctx

  const isGroup =
    message?.chat.type === "group" || message?.chat.type === "supergroup"

  if (isGroup) {
    await ctx.reply("This bot is only available in private chats.")
    return
  }

  const telegramUsername = message?.from?.username
  const reply = "a message was sent from botroute"

  await ctx.reply(reply, {
    reply_to_message_id: message.message_id,
  })
}
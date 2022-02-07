import { Context, Markup, Scenes } from 'telegraf'
import NotificationService from '../../services/notification.service'

export const getNotifications = async (userId: number) => {
  const notificationService = new NotificationService()
  const notifications: any = await notificationService.findNotificationByAccount(userId)
  const notifButtons: any = notifications.map((n: any) => {
    const buttonNameIcon = n.accounts.length === 0 ? '➕' : '❌'
    const btn = Markup.button.callback(`${n.name} ${buttonNameIcon}`, JSON.stringify({ a: 'subscribeNotification', p: {id: n.id} }), false)
    return [btn]
  })
  const res: any =  Markup.inlineKeyboard(notifButtons)
  return res
  // return Markup.inlineKeyboard([
  //   // Markup.button.callback(`influenserul`, JSON.stringify({ a: 'subscribeNotification', p: 'notificationId1' }), false),
  //   Markup.button.callback(`influenserul`, 'subscribeNotification', false),
  //   // Markup.button.callback(`datorii`, JSON.stringify({ a: 'subscribeNotification', p: 'notificationId2' }), false),
  //   // Markup.button.callback(`emag`, JSON.stringify({ a: 'subscribeNotification', p: 'notificationId3' }), false),
  // ])
}

// const subscribeNotificationAction = (ctx: Context)  => {
//   // const callbackData = ctx.callbackQuery
// }

interface MySceneSession extends Scenes.SceneSessionData {
  // will be available under `ctx.scene.session.mySceneSessionProp`
  mySceneSessionProp: number
}

type MyContext = Scenes.SceneContext<MySceneSession>

const notifications = new Scenes.BaseScene<MyContext>('notifications')

notifications.enter(async (ctx: Context) => {
  const userId = String(ctx.from.id)
  await ctx.reply('The list of notifications !', await getNotifications(Number(userId)));
})

// TODO: for some reason adding actions to scenes is not working, i need to add the action on the bot instance, see bot.service.ts
// notifications.action(/subscribeNotification/, async (ctx, next) => {
//   return ctx.reply('tesintg subscribeNotification !!!').then(() => next())
// })

export default notifications
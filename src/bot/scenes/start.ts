import { Scenes } from 'telegraf'

const start = new Scenes.BaseScene<Scenes.SceneContext>('start')

start.enter(async (ctx: any) => {
  await ctx.reply('/connect /notifications');
})

export default start
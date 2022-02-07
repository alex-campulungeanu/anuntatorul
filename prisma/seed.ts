import { PrismaClient, Notification} from '@prisma/client'

import { notificationSeedData } from './seeds/notifications-seed-data'

const prisma = new PrismaClient()

const addNotifications = async function() {
  for await (let notificationItem of notificationSeedData) {
    const notification: Notification= await prisma.notification.upsert({
      where: {
        id: notificationItem.id,
      },
      update: notificationItem,
      create: notificationItem,
    })
  }
}

async function main() {
  await prisma.$connect()
  await addNotifications()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { Notification } from '@prisma/client'

import { constants } from '../../src/configs/constants'

export const notificationSeedData: Notification[] = [
  {
    id: 1,
    name: constants.notificationName.influenser,
    label: "Influenser Fun",
    description: ""
  }
]
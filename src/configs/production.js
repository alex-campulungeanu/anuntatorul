module.exports = {
  env: "production",
  app: {
    jwt: process.env.JWT
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN
  },
  telegram: {
    apiKey: process.env.TELEGRAM_KEY,
    secretHash: process.env.SECRET_HASH_WEBHOOK
  },
  server: {
    url: process.env.SERVER_URL
  }
}
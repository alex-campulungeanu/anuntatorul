module.exports = {
  env: "development",
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
  proxy: {
    http: process.env.HTTP_PROXY,
    https: process.env.HTTPS_PROXY
  },
  server: {
    url: process.env.SERVER_URL
  }
}
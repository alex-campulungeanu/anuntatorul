
<h1 align="center">
<br>
  "anuntatorul"
</h1>

<p align="center">you forgot stuff ? say no more !</p>

<hr />
<br />


## 📚 Project Definition

A telegram bot used to notify users on some events.


## 🛠️ Features

Technologies used:

- 📗 **Express JS**
- ☎️ **telegraf.js**
- 🌐 **Docker**


## 🚀 Instalation


## 💻 Development
- cp .env based on .env.example
docker-compose up -d
- use ngrok so the telegram can connect to your server (localhost is not accesible)
root@78ba61db52c0:/app# npm run prisma:migrate-dev
root@78ba61db52c0:/app# npm run prisma:seed
root@78ba61db52c0:/app# npm run dev

- export DEBUG='telegraf:*'


## 💻 Deployment
- trying to deploy on vercel (currently not working due to 10 seconds limit on functions)
- generate selfsignade certificate
    openssl genrsa -out localhost.key 2048
    openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost

## Documentation
https://github.com/dmbaranov/evemovies-bot
https://github.com/Kriv-Art/BibleBot
https://github.com/jsjoeio/telegram-bot-template/blob/main/api/telegram-hook.ts
https://github.com/telegraf/telegraf/blob/v4/docs/examples/express-webhook-bot.ts
https://github.com/telegraf/telegraf/blob/v4/docs/examples/keyboard-bot.js

## TODO: 
[ ] tsconfig paths not working in Vercel 
[ ] use ManyBot for menu (i think it's the only way)
[ ] improve logger service
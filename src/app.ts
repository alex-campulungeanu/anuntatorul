import 'dotenv/config';
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import express from "express";
import morgan from 'morgan'

import errorMiddleware from './middlewares/error.middleware';
import HomeRoute from './routes/home.route'
import BotRoute from './routes/bot.route'
import AccountRoute from './routes/account.route'
import NotificationRoute from './routes/notification.route'
import AuthRoute from './routes/auth.route';

class App {
  public app: express.Application
  public port: string | number
  public env: string

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3012
    this.env = process.env.NODE_ENV || 'development'
    
    this.initializeMiddlewares()
    this.initializeRoutes()
    // error middleware should be initialize after routes, who knows why !!?!!
    // https://stackoverflow.com/questions/29700005/express-4-middleware-error-handler-not-being-called
    this.initializeErrorHandling();
  }
  
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on http://localhost:${this.port}/`);
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public initializeMiddlewares() {
    //  TODO: change morgan format
    this.app.use(morgan("combined"))
    // this.app.use(morganMiddleware)
    this.app.use(express.json())
    // this.app.use(express.urlencoded({ extended: true }));
  }

  public initializeRoutes() {
    //  TODO: check if i can put all routes into one
    const routes: any = [
      new HomeRoute(), 
      new BotRoute(), 
      new AccountRoute(), 
      new NotificationRoute(),
      new AuthRoute(),
    ]
    routes.forEach((route: any) => {
      this.app.use('/server/', route.router)
    })
  }

  public initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App

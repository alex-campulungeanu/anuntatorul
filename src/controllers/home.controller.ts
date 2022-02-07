import {Request, Response} from 'express'
import { logger } from '../utils/logger' 


class HomeController {
  
  public index = (req: Request, res: Response): void => {
    logger.info("this is from HomeController")
    res.json("This is from home controller -> home route")
  }
}

export default HomeController
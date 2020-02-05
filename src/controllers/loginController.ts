import express from 'express'
import iController from '../interfaces/iController';

const ROUTE = '/login'
const ROUTER = express.Router()
const LOGIN_PATH = '/'
const REGISTER_PATH = '/register'

export default class LoginController implements iController{
    
    route: string = ROUTE;    
    router = ROUTER;

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(): void {
       this.router.get(LOGIN_PATH, this.doLogin)
       this.router.get(REGISTER_PATH, this.doRegister)
    }

    doLogin = (req: express.Request, res: express.Response) => {
        res.send('login works!')
    }

    doRegister = (req: express.Request, res: express.Response) => {
        res.send('register works!')
    }
    
}
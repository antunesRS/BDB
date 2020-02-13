import express from 'express'
import iController from '../interfaces/iController'
import passwordHasher from 'password-hash'
import database from '../database/database'
import Login from '../domain/Login'
import {Error, StatusCode} from '../enums/Enums'

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
       this.router.post(LOGIN_PATH, this.doLogin)
       this.router.post(REGISTER_PATH, this.doRegister)
    }

    doLogin = (req: express.Request, res: express.Response) => {
        database.find({user: req.query.user}, 'login', (err, result) => {
            if(err){
                console.log(`${Error.DATABASE_ERROR}: ERRO - ${err}`)
                res.status(StatusCode.INTERNAL_SERVER_ERROR).send(Error.DATABASE_ERROR)
            }
            if(result.length != 0){
                const login = new Login().fromDatabase(result)
                
                if(passwordHasher.verify(login.password, result[0].hashedPassword))
                    res.status(StatusCode.OK).send('Auth ok!')
                else
                    res.status(StatusCode.FORBIDDEN).send('auth denied!')

            }
        })
    }

    doRegister = (req: express.Request, res: express.Response) => {
       const login = new Login().fromRequest(req)

        database.save('login', login.toObject(), () => {
            res.status(StatusCode.OK).send('Register ok!')
        }, (error: any) => {
            console.log(`${Error.DATABASE_ERROR}: ERRO - ${error}`)
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(Error.DATABASE_ERROR)
        })
    }
    
}
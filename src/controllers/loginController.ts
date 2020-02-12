import express from 'express'
import iController from '../interfaces/iController'
import passwordHasher from 'password-hash'
import database from '../database/database'
import Login from '../domain/Login'

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
                console.log(err)
                res.status(500).send('Ocorreu um erro ao tentar logar')
            }
            if(result.length != 0){
                const login = new Login().fromDatabase(result)
                
                if(passwordHasher.verify(login.password, result[0].hashedPassword))
                    res.send('Auth ok!')
                else
                    res.send('auth denied!')

            }
        })
    }

    doRegister = (req: express.Request, res: express.Response) => {
       const login = new Login().fromRequest(req)

        database.save('login', login.toDatabase(), () => {
            console.log('teste')
            res.status(200).send('OK!')
        }, (error: any) => {
            console.log(error)
        })
    }
    
}
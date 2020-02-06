import express from 'express'
import iController from '../interfaces/iController'
import passwordHasher from 'password-hash'
import database from '../database/database'

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
        database.findByEmail(req.query.email, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send('Ocorreu um erro ao tentar logar')
            }
            if(result.length != 0){
                var storedPassword = result[0].hashedPassword
                
                if(passwordHasher.verify(req.query.password, storedPassword))
                    res.send('Auth ok!')
                else
                    res.send('auth denied!')

            }
                
        })
    }

    doRegister = (req: express.Request, res: express.Response) => {
        var name = req.query.name
        var email = req.query.email
        var password = req.query.password
        var hashedPassword = passwordHasher.generate(password)
        console.log(`${password} - ${hashedPassword}`)
        try {
            database.save('login', {name: name, email: email, password: password, hashedPassword: hashedPassword})
        } catch (error) {
            
        }
        res.status(200).send('OK!')
    }
    
}
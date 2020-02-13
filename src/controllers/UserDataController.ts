import iController from "../interfaces/iController";
import express from 'express'
import database from '../database/database'
import UserData from '../domain/UserData'
import {Error, StatusCode} from '../enums/Enums'

const ROUTE = '/userData'
const ROUTER = express.Router()
const SAVE_PATH = '/save'
const READ_PATH = '/'

export default class UserDataController implements iController{
    route: string = ROUTE;    
    router = ROUTER;

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(): void {
        this.router.post(SAVE_PATH, this.save)
        this.router.get(READ_PATH, this.find)
    }

    save = (req: express.Request, res: express.Response) => {
        const userData = new UserData().fromRequest(req)
         try {
             database.save('userData', userData.toObject(), () => {
                console.log('teste')
                res.status(StatusCode.OK).send('OK!')
             }, (error : any) => {
                console.log(`${Error.DATABASE_ERROR}: ERRO - ${error}`)
                res.status(StatusCode.INTERNAL_SERVER_ERROR).send(Error.DATABASE_ERROR)
             })
         } catch (error) {
             
         }
         res.status(200).send('OK!')
     }

     find = (req: express.Request, res: express.Response) => {
         database.find({name: req.query.name}, 'userData', (err, result) => {
            if(err){
                console.log(`${Error.DATABASE_ERROR}: ERRO - ${err}`)
                res.status(StatusCode.INTERNAL_SERVER_ERROR).send(Error.DATABASE_ERROR)
            }

            const userData = new UserData().fromDatabase(result)
            res.status(StatusCode.OK).json(userData)

         })
     }

    
}
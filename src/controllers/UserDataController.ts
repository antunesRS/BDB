import iController from "../interfaces/iController";
import express from 'express'
import database from '../database/database'
import UserData from '../domain/UserData'

const ROUTE = '/userData'
const ROUTER = express.Router()
const SAVE_PATH = '/save'
const READ_PATH = '/'

export default class Controller implements iController{
    route: string = ROUTE;    
    router = ROUTER;

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes(): void {
        throw new Error("Method not implemented.");
    }

    save = (req: express.Request, res: express.Response) => {
        const userData = new UserData().fromRequest(req)
         try {
             database.save('userData', userData.toDatabase(), () => {
                console.log('teste')
                res.status(200).send('OK!')
             }, (error : any) => {
                console.log('erro')
                res.status(200).send('erro!')
             })
         } catch (error) {
             
         }
         res.status(200).send('OK!')
     }

    
}
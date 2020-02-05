import express from 'express'
import bodyParser from 'body-parser'
import iController from './interfaces/iController';

export default class App{
    public app!: express.Application
    public port!: number

    constructor(controllers : [iController], port : number) {
        this.app = express();
        this.port = port;
     
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json())
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeControllers(controllers : [iController]) {
        controllers.forEach((controller : iController) => {
          this.app.use(controller.route, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
          console.log(`Server listening on port ${this.port}`);
        });
      }
}
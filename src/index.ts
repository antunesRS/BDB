import App from './app'
import LoginController from './controllers/loginController'
import UserDataContoller from './controllers/UserDataController'

const PORT = 3001
const app = new App([
    new LoginController(), 
    new UserDataContoller()
], PORT)
app.listen()
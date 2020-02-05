import App from './app'
import LoginController from './controllers/loginController'

const PORT = 3001
const app = new App([new LoginController()], PORT)
app.listen()
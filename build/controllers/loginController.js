"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ROUTE = '/login';
var ROUTER = express_1.default.Router();
var LOGIN_PATH = '/';
var REGISTER_PATH = '/register';
var LoginController = /** @class */ (function () {
    function LoginController() {
        this.route = ROUTE;
        this.router = ROUTER;
        this.doLogin = function (req, res) {
            res.send('login works!');
        };
        this.doRegister = function (req, res) {
            res.send('register works!');
        };
        this.initializeRoutes();
    }
    LoginController.prototype.initializeRoutes = function () {
        this.router.get(LOGIN_PATH, this.doLogin);
        this.router.get(REGISTER_PATH, this.doRegister);
    };
    return LoginController;
}());
exports.default = LoginController;

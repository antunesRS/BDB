"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var password_hash_1 = __importDefault(require("password-hash"));
var database_1 = __importDefault(require("../database/database"));
var Login_1 = __importDefault(require("../domain/Login"));
var ROUTE = '/login';
var ROUTER = express_1.default.Router();
var LOGIN_PATH = '/';
var REGISTER_PATH = '/register';
var LoginController = /** @class */ (function () {
    function LoginController() {
        this.route = ROUTE;
        this.router = ROUTER;
        this.doLogin = function (req, res) {
            database_1.default.find({ user: req.query.user }, 'login', function (err, result) {
                if (err) {
                    console.log("Erro ao consultar base de dados" /* DATABASE_ERROR */ + ": ERRO - " + err);
                    res.status(500 /* INTERNAL_SERVER_ERROR */).send("Erro ao consultar base de dados" /* DATABASE_ERROR */);
                }
                if (result.length != 0) {
                    var login = new Login_1.default().fromDatabase(result);
                    if (password_hash_1.default.verify(login.password, result[0].hashedPassword))
                        res.status(200 /* OK */).send('Auth ok!');
                    else
                        res.status(403 /* FORBIDDEN */).send('auth denied!');
                }
            });
        };
        this.doRegister = function (req, res) {
            var login = new Login_1.default().fromRequest(req);
            database_1.default.save('login', login.toObject(), function () {
                res.status(200 /* OK */).send('Register ok!');
            }, function (error) {
                console.log("Erro ao consultar base de dados" /* DATABASE_ERROR */ + ": ERRO - " + error);
                res.status(500 /* INTERNAL_SERVER_ERROR */).send("Erro ao consultar base de dados" /* DATABASE_ERROR */);
            });
        };
        this.initializeRoutes();
    }
    LoginController.prototype.initializeRoutes = function () {
        this.router.post(LOGIN_PATH, this.doLogin);
        this.router.post(REGISTER_PATH, this.doRegister);
    };
    return LoginController;
}());
exports.default = LoginController;

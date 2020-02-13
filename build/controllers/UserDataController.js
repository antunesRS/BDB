"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = __importDefault(require("../database/database"));
var UserData_1 = __importDefault(require("../domain/UserData"));
var ROUTE = '/userData';
var ROUTER = express_1.default.Router();
var SAVE_PATH = '/save';
var READ_PATH = '/';
var UserDataController = /** @class */ (function () {
    function UserDataController() {
        this.route = ROUTE;
        this.router = ROUTER;
        this.save = function (req, res) {
            var userData = new UserData_1.default().fromRequest(req);
            try {
                database_1.default.save('userData', userData.toObject(), function () {
                    console.log('teste');
                    res.status(200 /* OK */).send('OK!');
                }, function (error) {
                    console.log("Erro ao consultar base de dados" /* DATABASE_ERROR */ + ": ERRO - " + error);
                    res.status(500 /* INTERNAL_SERVER_ERROR */).send("Erro ao consultar base de dados" /* DATABASE_ERROR */);
                });
            }
            catch (error) {
            }
            res.status(200).send('OK!');
        };
        this.find = function (req, res) {
            database_1.default.find({ name: req.query.name }, 'userData', function (err, result) {
                if (err) {
                    console.log("Erro ao consultar base de dados" /* DATABASE_ERROR */ + ": ERRO - " + err);
                    res.status(500 /* INTERNAL_SERVER_ERROR */).send("Erro ao consultar base de dados" /* DATABASE_ERROR */);
                }
                var userData = new UserData_1.default().fromDatabase(result);
                res.status(200 /* OK */).json(userData);
            });
        };
        this.initializeRoutes();
    }
    UserDataController.prototype.initializeRoutes = function () {
        this.router.post(SAVE_PATH, this.save);
        this.router.get(READ_PATH, this.find);
    };
    return UserDataController;
}());
exports.default = UserDataController;

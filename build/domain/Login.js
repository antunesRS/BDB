"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var password_hash_1 = __importDefault(require("password-hash"));
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.prototype.fromDatabase = function (result) {
        this._user = result[0].user;
        this._password = result[0].password;
        this._hashedPassword = result[0].hashedPassword;
        this._profile = result[0].profile;
        return this;
    };
    Login.prototype.fromRequest = function (req) {
        this._user = req.query.user;
        this._password = req.query.password;
        this._hashedPassword = password_hash_1.default.generate(req.query.password);
        this._profile = req.query.profile;
        return this;
    };
    Login.prototype.toObject = function () {
        return {
            email: this._user,
            password: this._password,
            hashedPassword: this._hashedPassword,
            profile: this._profile
        };
    };
    Object.defineProperty(Login.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        set: function (value) {
            this._profile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "hashedPassword", {
        get: function () {
            return this._hashedPassword;
        },
        set: function (value) {
            this._hashedPassword = value;
        },
        enumerable: true,
        configurable: true
    });
    return Login;
}());
exports.default = Login;

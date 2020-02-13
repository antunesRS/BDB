"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = __importDefault(require("./Location"));
var UserData = /** @class */ (function () {
    function UserData() {
    }
    UserData.prototype.fromDatabase = function (result) {
        this._name = result[0].name,
            this._location = new Location_1.default(result[0].latitude, result[0].longitude);
        this._selfDescription = result[0].selfDescription;
        this._imageId = result[0].imageId;
        this._birthDate = result[0].birthDate;
        return this;
    };
    UserData.prototype.toObject = function () {
        return {
            name: this._name,
            selfDescription: this._selfDescription,
            latitude: this._location.latitude,
            longitude: this._location.longitude,
            imageId: this._imageId,
            birthDate: this._birthDate
        };
    };
    UserData.prototype.fromRequest = function (req) {
        this._name = req.query.name;
        this._selfDescription = req.query.selfDescription;
        this._location = new Location_1.default(req.query.latitude, req.query.longitude);
        this._imageId = req.query.imageId;
        this._birthDate = req.query.birthDate;
        return this;
    };
    Object.defineProperty(UserData.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "selfDescription", {
        get: function () {
            return this._selfDescription;
        },
        set: function (value) {
            this._selfDescription = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (value) {
            this._location = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "imageId", {
        get: function () {
            return this._imageId;
        },
        set: function (value) {
            this._imageId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "birthDate", {
        get: function () {
            return this._birthDate;
        },
        set: function (value) {
            this._birthDate = value;
        },
        enumerable: true,
        configurable: true
    });
    return UserData;
}());
exports.default = UserData;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("mongodb"));
var URL = 'mongodb://localhost:27017/busca';
var DB_NAME = 'busca';
var Repository = /** @class */ (function () {
    function Repository() {
    }
    Repository.save = function (collectionName, data, success, error) {
        mongodb_1.default.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            if (err) {
                console.log(err);
                throw err;
            }
            var db = client.db(DB_NAME);
            db.collection(collectionName)
                .findOneAndUpdate({ name: data.userId }, {
                $setOnInsert: data,
            }, {
                returnOriginal: false,
                upsert: true,
            }).then(success).catch(error);
        });
    };
    Repository.find = function (searchParameter, collection, callback) {
        mongodb_1.default.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            if (err) {
                console.log(err);
                throw err;
            }
            var db = client.db(DB_NAME);
            db.collection(collection).find(searchParameter).toArray(callback);
        });
    };
    return Repository;
}());
exports.default = Repository;

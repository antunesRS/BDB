"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var loginController_1 = __importDefault(require("./controllers/loginController"));
var PORT = 3001;
var app = new app_1.default([new loginController_1.default()], PORT);
app.listen();

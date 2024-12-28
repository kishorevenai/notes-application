"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const Cred_1 = require("../Controllers/Cred");
exports.userRoute = express_1.default.Router();
//@ts-ignore
exports.userRoute.get("/", Cred_1.Signup);
//@ts-ignore
exports.userRoute.post("/", Cred_1.LoginFunc);

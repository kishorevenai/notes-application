"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controllers/authController");
exports.authRoute = express_1.default.Router();
//@ts-ignore
exports.authRoute.route("/refresh").get(authController_1.refresh);

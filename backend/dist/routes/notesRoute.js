"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoute = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../Controllers/User");
exports.notesRoute = express_1.default.Router();
//@ts-ignore
exports.notesRoute.get("/user-detail/:id", User_1.GetAllDetailsOfUser);
//@ts-ignore
exports.notesRoute.post("/add-note", User_1.AddNotes);
//@ts-ignore
exports.notesRoute.post("/edit-note", User_1.EditUsersNote);
//@ts-ignore
exports.notesRoute.delete("/delete-note", User_1.DeleteUserNote);

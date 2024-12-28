"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesRoute_1 = require("./routes/notesRoute");
const userRoute_1 = require("./routes/userRoute");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/sign-up", userRoute_1.userRoute);
app.use("/login", userRoute_1.userRoute);
app.use("/user", notesRoute_1.notesRoute);
app.listen(3500, () => {
    console.log("The server running on port 3500");
});

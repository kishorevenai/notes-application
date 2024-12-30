"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesRoute_1 = require("./routes/notesRoute");
const userRoute_1 = require("./routes/userRoute");
const authRoute_1 = require("./routes/authRoute");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Allows cookies and credentials to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/auth", authRoute_1.authRoute);
app.use("/author", userRoute_1.userRoute);
app.use("/login", userRoute_1.userRoute);
//@ts-ignore
// app.use(verifyJWT);
app.use("/user", notesRoute_1.notesRoute);
app.listen(3500, () => {
    console.log("The server running on port 3500");
});

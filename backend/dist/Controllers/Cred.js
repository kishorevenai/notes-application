"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFunc = exports.Signup = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { data: users } = yield axios_1.default.get("http://localhost:3200/users");
    const duplicate = users.some((eachUser) => {
        return eachUser.email == email;
    });
    if (duplicate) {
        return res
            .json({
            message: "The Email is Already in use.",
        })
            .status(200);
    }
    if (!name || !email || name.trim() === "" || email.trim() === "")
        return res
            .json({
            message: "The Parameters are missing",
        })
            .status(200);
    const Hashed_Password = yield bcrypt_1.default.hash(password, 10);
    yield axios_1.default.post("http://localhost:3200/users", {
        id: (0, uuid_1.v4)(),
        name,
        email,
        password: Hashed_Password,
        notes: [],
    });
    return res
        .json({ message: `You have Created your accout Successfully` })
        .status(200);
});
exports.Signup = Signup;
const LoginFunc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password || email.trim() === "" || password.trim() === "")
        return res.json({ message: "Unauthorized" }).status(401);
    const { data } = yield axios_1.default.get("http://localhost:3200/users");
    const user = data.find((eachUser) => eachUser.email == email);
    if (!user)
        return res.status(401).json({ message: "No user found" });
    const verifyUser = yield bcrypt_1.default.compare(password, user.password);
    if (!verifyUser)
        return res.status(401).json({ message: "Unauthorized" });
    const accessToken = jsonwebtoken_1.default.sign({
        userDetail: user,
    }, "samplehash", { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({
        email,
        id: user.id,
    }, "samplehashtest", {
        expiresIn: "7d",
    });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json(accessToken);
});
exports.LoginFunc = LoginFunc;

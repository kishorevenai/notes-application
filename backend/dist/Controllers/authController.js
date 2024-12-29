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
exports.refresh = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CHECKING COMING HERE");
    const cookie = req.cookies;
    console.log(cookie);
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.jwt))
        return res.status(400).json({ message: "Unauthorized" });
    const refreshToken = cookie.jwt;
    jsonwebtoken_1.default.verify(refreshToken, "samplehashtest", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.json({ message: "Forbidden" }).status(403);
        const user = yield axios_1.default.get(`http://localhost:3200/users/${decoded.id}`);
        const accessToken = jsonwebtoken_1.default.sign({
            userDetail: user.data,
        }, "samplehash", { expiresIn: "15m" });
        return res.json(accessToken);
    }));
});
exports.refresh = refresh;

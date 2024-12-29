import express from "express";
import { refresh } from "../Controllers/authController";
export const authRoute = express.Router();

//@ts-ignore
authRoute.route("/refresh").get(refresh);

import express from "express";
import { Signup, LoginFunc } from "../Controllers/Cred";
export const userRoute = express.Router();

//@ts-ignore
userRoute.post("/sign-up", Signup);

//@ts-ignore
userRoute.post("/", LoginFunc);

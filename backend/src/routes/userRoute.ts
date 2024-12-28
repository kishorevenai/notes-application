import express from "express";
import { Signup, LoginFunc } from "../Controllers/Cred";
export const userRoute = express.Router();

//@ts-ignore
userRoute.get("/", Signup);

//@ts-ignore
userRoute.post("/", LoginFunc);

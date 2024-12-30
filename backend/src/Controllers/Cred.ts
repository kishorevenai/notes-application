import { Request, Response } from "express";
import axios from "axios";
import { SignUp, Login, User } from "../types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req: Request, res: Response) => {
  const { name, email, password }: SignUp = req.body;

  const { data: users } = await axios.get("http://localhost:3200/users");

  const duplicate = users.some((eachUser: any) => {
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

  const Hashed_Password = await bcrypt.hash(password, 10);

  await axios.post("http://localhost:3200/users", {
    id: uuid(),
    name,
    email,
    password: Hashed_Password,
    notes: [],
  });

  return res
    .json({ message: `You have Created your accout Successfully` })
    .status(200);
};

export const LoginFunc = async (req: Request, res: Response) => {
  const { email, password }: Login = req.body;

  console.log(email, password);

  if (!email || !password || email.trim() === "" || password.trim() === "")
    return res.json({ message: "Unauthorized" }).status(401);

  const { data } = await axios.get("http://localhost:3200/users");

  const user: User = data.find((eachUser: User) => eachUser.email == email);

  if (!user) return res.status(401).json({ message: "No user found" });

  const verifyUser = await bcrypt.compare(password, user.password);

  if (!verifyUser) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      userDetail: user,
    },
    "samplehash",
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      email,
      id: user.id,
    },
    "samplehashtest",
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json(accessToken);
};

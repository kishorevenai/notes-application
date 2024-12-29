import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import axios from "axios";

export const refresh = async (req: Request, res: Response) => {
  console.log("CHECKING COMING HERE");
  const cookie = req.cookies;

  console.log(cookie);

  if (!cookie?.jwt) return res.status(400).json({ message: "Unauthorized" });

  const refreshToken = cookie.jwt;

  jwt.verify(refreshToken, "samplehashtest", async (err: any, decoded: any) => {
    if (err) return res.json({ message: "Forbidden" }).status(403);

    const user = await axios.get(`http://localhost:3200/users/${decoded.id}`);

    const accessToken = jwt.sign(
      {
        userDetail: user.data,
      },
      "samplehash",
      { expiresIn: "15m" }
    );

    return res.json(accessToken);
  });
};

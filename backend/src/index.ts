import express from "express";
import { notesRoute } from "./routes/notesRoute";
import { userRoute } from "./routes/userRoute";
import { authRoute } from "./routes/authRoute";
import cookieparser from "cookie-parser";
import cors from "cors";
import { verifyJWT } from "./Middleware/verifyJWT";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());

app.use("/auth", authRoute);

app.use("/author", userRoute);
app.use("/login", userRoute);

//@ts-ignore
app.use(verifyJWT);

app.use("/user", notesRoute);

app.listen(3500, () => {
  console.log("The server running on port 3500");
});

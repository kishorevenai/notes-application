import express from "express";
import { notesRoute } from "./routes/notesRoute";
import { userRoute } from "./routes/userRoute";
import { LoginFunc } from "./Controllers/Cred";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/sign-up", userRoute);
app.use("/login", userRoute);
app.use("/user", notesRoute);

app.listen(3500, () => {
  console.log("The server running on port 3500");
});

import express from "express";
import {
  GetAllDetailsOfUser,
  EditUsersNote,
  DeleteUserNote,
  AddNotes,
} from "../Controllers/User";

export const notesRoute = express.Router();

//@ts-ignore
notesRoute.get("/user-detail/:id", GetAllDetailsOfUser);

//@ts-ignore
notesRoute.post("/add-note", AddNotes);

//@ts-ignore
notesRoute.post("/edit-note", EditUsersNote);

//@ts-ignore
notesRoute.delete("/delete-note", DeleteUserNote);

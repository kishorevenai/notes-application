import { Request, Response } from "express";
import { Users } from "../notes";
import axios from "axios";
import { Note } from "../types";

export const GetAllDetailsOfUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await axios.get(`http://localhost:3200/users/${id}`);
    return res.json(user.data.notes).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const AddNotes = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const result: Note = req.body;

  console.log("CAME HERE SUCCESSFULLY", result);

  try {
    const notes = await axios.get(`http://localhost:3200/users/${userId}`);

    const alterednote: Note[] = [...notes.data.notes, result];

    await axios.patch(`http://localhost:3200/users/${userId}`, {
      notes: alterednote,
    });

    return res
      .json({
        message: "notes Added successfully",
        data: alterednote,
      })
      .status(200);
  } catch (error) {
    return res.json({ message: "Unable to Edit the note" }).status(400);
  }
};

export const EditUsersNote = async (req: Request, res: Response) => {
  const { userId, notesId } = req.query;
  const result: Note = req.body;

  console.log("EDIT TESTING", userId, notesId, result);

  try {
    const notes = await axios.get(`http://localhost:3200/users/${userId}`);

    const alterednote: Note[] = notes.data.notes.map((note: Note) =>
      note.id == notesId
        ? {
            ...note,
            id: notesId,
            title: result.title || note.title,
            body: result.body || note.body,
            tags: result.tags || note.tags,
          }
        : note
    );

    console.log("ASDASD", alterednote);

    await axios.put(`http://localhost:3200/users/${userId}`, {
      ...notes.data,
      notes: alterednote,
    });

    return res
      .json({
        message: "notes changed successfully",
        data: alterednote,
      })
      .status(200);
  } catch (error) {
    return res.json({ message: "Unable to Edit the note" }).status(400);
  }
};

export const DeleteUserNote = async (req: Request, res: Response) => {
  const { userId, notesId } = req.query;
  console.log("BECAME RICH", userId, notesId);

  try {
    const user = await axios.get(`http://localhost:3200/users/${userId}`);

    const alterednote: Note[] = user.data.notes.filter(
      (note: Note) => note.id != notesId
    );

    console.log("FINAL CHECKER", alterednote);

    await axios.put(`http://localhost:3200/users/${userId}`, {
      ...user.data,
      notes: alterednote,
    });

    return res
      .json({
        message: "notes deleted successfully",
        data: alterednote,
      })
      .status(200);
  } catch (error) {
    return res.json({ message: "Unable to delete the note" }).status(400);
  }
};

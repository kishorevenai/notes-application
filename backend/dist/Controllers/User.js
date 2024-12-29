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
exports.DeleteUserNote = exports.EditUsersNote = exports.getSpecificNote = exports.AddNotes = exports.GetAllDetailsOfUser = void 0;
const axios_1 = __importDefault(require("axios"));
const GetAllDetailsOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield axios_1.default.get(`http://localhost:3200/users/${id}`);
        return res.json(user.data.notes).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetAllDetailsOfUser = GetAllDetailsOfUser;
const AddNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const result = req.body;
    console.log("CAME HERE SUCCESSFULLY", result);
    try {
        const notes = yield axios_1.default.get(`http://localhost:3200/users/${userId}`);
        const alterednote = [...notes.data.notes, result];
        yield axios_1.default.patch(`http://localhost:3200/users/${userId}`, {
            notes: alterednote,
        });
        return res
            .json({
            message: "notes Added successfully",
            data: alterednote,
        })
            .status(200);
    }
    catch (error) {
        return res.json({ message: "Unable to Edit the note" }).status(400);
    }
});
exports.AddNotes = AddNotes;
const getSpecificNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteId, userId } = req.query;
    console.log(noteId, "------------", userId);
    try {
        const specificNote = yield axios_1.default.get(`http://localhost:3200/users/${userId}`);
        const note = specificNote.data.notes.find((notes) => notes.id === noteId);
        return res.status(200).json(note);
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "Unable to find the specific note." });
    }
});
exports.getSpecificNote = getSpecificNote;
const EditUsersNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, notesId } = req.query;
    const result = req.body;
    console.log("EDIT TESTING", userId, notesId, result);
    try {
        const notes = yield axios_1.default.get(`http://localhost:3200/users/${userId}`);
        const alterednote = notes.data.notes.map((note) => note.id == notesId
            ? Object.assign(Object.assign({}, note), { id: notesId, title: result.title || note.title, body: result.body || note.body, tags: result.tags || note.tags }) : note);
        console.log("ASDASD", alterednote);
        yield axios_1.default.put(`http://localhost:3200/users/${userId}`, Object.assign(Object.assign({}, notes.data), { notes: alterednote }));
        return res
            .json({
            message: "notes changed successfully",
            data: alterednote,
        })
            .status(200);
    }
    catch (error) {
        return res.json({ message: "Unable to Edit the note" }).status(400);
    }
});
exports.EditUsersNote = EditUsersNote;
const DeleteUserNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, notesId } = req.query;
    console.log("BECAME RICH", userId, notesId);
    try {
        const user = yield axios_1.default.get(`http://localhost:3200/users/${userId}`);
        const alterednote = user.data.notes.filter((note) => note.id != notesId);
        console.log("FINAL CHECKER", alterednote);
        yield axios_1.default.put(`http://localhost:3200/users/${userId}`, Object.assign(Object.assign({}, user.data), { notes: alterednote }));
        return res
            .json({
            message: "notes deleted successfully",
            data: alterednote,
        })
            .status(200);
    }
    catch (error) {
        return res.json({ message: "Unable to delete the note" }).status(400);
    }
});
exports.DeleteUserNote = DeleteUserNote;

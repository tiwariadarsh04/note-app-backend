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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const noteModel_1 = require("../models/noteModel");
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    try {
        const notes = yield noteModel_1.Note.find({ userEmail: email }).sort({ createdAt: -1 });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const { content } = req.body;
    if (!content)
        return res.status(400).json({ message: 'Note content is required' });
    try {
        const note = new noteModel_1.Note({ content, userEmail: email });
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note' });
    }
});
exports.createNote = createNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const { id } = req.params;
    try {
        const note = yield noteModel_1.Note.findOneAndDelete({ _id: id, userEmail: email });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }
        res.json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note' });
    }
});
exports.deleteNote = deleteNote;

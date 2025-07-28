import { Request, Response } from 'express';
import { Note } from '../models/noteModel';


export const getNotes = async (req: Request, res: Response) => {
  const email = (req as any).user.email;
  try {
    const notes = await Note.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const email = (req as any).user.email;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: 'Note content is required' });

  try {
    const note = new Note({ content, userEmail: email });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};


export const deleteNote = async (req: Request, res: Response) => {
  const email = (req as any).user.email;
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, userEmail: email });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};


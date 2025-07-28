import express from 'express';
import { createNote, deleteNote, getNotes } from '../controllers/noteController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(verifyToken);
router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;

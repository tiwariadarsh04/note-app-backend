import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const Note = mongoose.model('Note', noteSchema);

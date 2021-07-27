import { Schema, model } from 'mongoose';
import { Book } from '../shared/interfaces/book';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export const BookModel = model<Book & Document>('Book', bookSchema);
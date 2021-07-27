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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_model_1 = require("../../models/book.model");
const file_1 = require("../../middleware/file");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.BookModel.find();
        res.json(books);
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield book_model_1.BookModel.findById(id);
        res.json(book);
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
router.post("/", file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileBook = req.file ? req.file.path : "";
        const { title, description, authors, favorite, fileCover, fileName } = req.body;
        const newBook = new book_model_1.BookModel({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        newBook.save();
        res.json(newBook);
    }
    catch (error) {
        res.status(500).json();
    }
}));
router.put("/:id", file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fileBook = req.file ? req.file.path : "";
        const params = {};
        ['title', 'description', 'authors', 'favorite', 'fileCover', 'fileName', 'fileBook'].forEach(props => {
            if (req.body[props]) {
                params[props] = req.body[props];
            }
        });
        const book = yield book_model_1.BookModel.findByIdAndUpdate(id, params);
        res.json(book);
    }
    catch (error) {
        res.status(500).json();
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield book_model_1.BookModel.deleteOne({ _id: id });
        res.json(true);
    }
    catch (error) {
        res.status(500).json();
    }
}));
router.get("/:id/download-book", (req, res) => {
    const { books = [] } = {};
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        const { fileBook, fileName } = books[idx];
        res.download(__dirname + "/../" + fileBook, fileName, (err) => {
            if (err) {
                res.sendStatus(404).json();
            }
        });
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;

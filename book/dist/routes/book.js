"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const book_model_1 = require("../models/book.model");
const file_1 = require("../middleware/file");
// @ts-ignore
const store = __importStar(require("../data/books.json"));
const container_1 = require("../container");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = container_1.container.get('BOOK_SERVICE');
    const books = yield service.findAll();
    res.render("book/index", {
        title: "Книги",
        books: books,
    });
}));
router.get("/create", (req, res) => {
    res.render("book/create", {
        title: "Создать",
        book: {},
    });
});
router.post("/create", file_1.fileMiddleware.single("fileBook"), (req, res) => {
    try {
        const fileBook = req.file ? req.file.path : "";
        const { title, description, authors, favorite, fileCover, fileName } = req.body;
        const service = container_1.container.get('BOOK_SERVICE');
        service.create({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        res.redirect("/book");
    }
    catch (error) {
        res.status(500).json();
    }
});
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield book_model_1.BookModel.findById(id);
        console.log(book);
        res.render("book/view", {
            title: "Книги",
            book: book,
            counter: null,
        });
    }
    catch (error) {
        res.status(404).redirect("/404");
    }
}));
router.get("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield book_model_1.BookModel.findById(id);
        res.render("book/update", {
            title: "Редактирование",
            book: book,
        });
    }
    catch (error) {
        res.status(404).redirect("/404");
    }
}));
router.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fileBook = req.file ? req.file.path : "";
        const params = {};
        ['title', 'description', 'authors', 'favorite', 'fileCover', 'fileName', 'fileBook'].forEach(props => {
            if (req.body[props]) {
                params[props] = req.body[props];
            }
        });
        yield book_model_1.BookModel.findByIdAndUpdate(id, params);
        res.redirect(`/book/${id}`);
    }
    catch (error) {
        res.status(500).json();
    }
}));
router.post("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield book_model_1.BookModel.deleteOne({ _id: id });
        res.redirect(`/book`);
        res.json(true);
    }
    catch (error) {
        res.status(500).json();
    }
}));
router.get("/:id/download-book", (req, res) => {
    const { books } = store;
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

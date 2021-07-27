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
exports.BookService = void 0;
const Book_1 = require("./models/Book");
class BookService {
    constructor() {
        console.log('new BookService');
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = new Book_1.Book(data);
            yield book.save();
            return book;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.Book.find();
            return books;
        });
    }
}
exports.BookService = BookService;

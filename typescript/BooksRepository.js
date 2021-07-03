"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./Book");
class BooksRepository {
    constructor() {
        this.books = [];
        this.initializeBooks();
    }
    initializeBooks() {
        [1, 2, 3].map((el) => {
            const newBook = new Book_1.Book({
                title: `Book #${el}`,
                description: `This is description for Book #${el}`,
                authors: `Author of Book #${el}`,
                favorite: `${el === 1 ? "favorite" : "not favorite"}`,
                fileCover: `File cover Book #${el}`,
                fileName: `./books/Book${el}`,
                id: el,
                fileBook: './test'
            });
            this.books.push(newBook);
        });
    }
    createBook(book) {
        this.books.push(book);
    }
    getBook(id) {
        return this.books.find((book) => book.id === id);
    }
    getBooks() {
        return this.books;
    }
    updateBook(id, book) {
        const idx = this.books.findIndex((el) => el.id === id);
        if (idx !== -1) {
            return this.books[idx] = book;
        }
    }
    deleteBook(id) {
        const idx = this.books.findIndex(el => el.id === id);
        if (idx !== -1) {
            this.books.splice(idx, 1);
            return true;
        }
        else {
            return false;
        }
    }
}

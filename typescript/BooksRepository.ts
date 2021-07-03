import {Book} from './Book';

class BooksRepository {

    private books: Array<Book> = [];

    constructor() {
        this.initializeBooks();
    }

    initializeBooks(): void {
        [1, 2, 3].map((el: number) => {
            const newBook = new Book({
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

    createBook(book: Book) {
        this.books.push(book);
    }

    getBook(id: number): Book | undefined {
        return this.books.find((book: Book) => book.id === id);
    }

    getBooks(): Array<Book> {
        return this.books;
    }

    updateBook(id: number, book: Book): Book | undefined {
        const idx = this.books.findIndex((el: Book) => el.id === id);
        if (idx !== -1) {
            return this.books[idx] = book;
        }
    }

    deleteBook(id: number): boolean {
        const idx = this.books.findIndex(el => el.id === id);

        if (idx !== -1) {
            this.books.splice(idx, 1);
            return true;
        } else {
            return false;
        }

    }
}


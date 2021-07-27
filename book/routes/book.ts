import { BookService } from './../book.service';
import express from 'express';
import { BookModel } from '../models/book.model';
import { Book } from '../shared/interfaces/book';
import { fileMiddleware } from '../middleware/file';
// @ts-ignore
import * as store from '../data/books.json';
import { container } from '../container';

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    const service: BookService = container.get('BOOK_SERVICE');
    const books: Book[] = await service.findAll();

    res.render("book/index", {
        title: "Книги",
        books: books,
    });
});

router.get("/create", (req: any, res: any) => {
    res.render("book/create", {
        title: "Создать",
        book: {},
    });
});

router.post("/create", fileMiddleware.single("fileBook"), (req: any, res: any) => {
    try {
        const fileBook = req.file ? req.file.path : "";
        const { title, description, authors, favorite, fileCover, fileName } =
            req.body;

        const service: BookService = container.get('BOOK_SERVICE');
        service.create({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        })
        res.redirect("/book");
    } catch (error) {
        res.status(500).json();
    }
});

router.get("/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findById(id);
        console.log(book)

        res.render("book/view", {
            title: "Книги",
            book: book,
            counter: null,
        });
    } catch (error) {
        res.status(404).redirect("/404");
    }

});

router.get("/update/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findById(id);
        res.render("book/update", {
            title: "Редактирование",
            book: book,
        });
    } catch (error) {
        res.status(404).redirect("/404");
    }

});

router.post("/update/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const fileBook = req.file ? req.file.path : "";
        const params: any = {};

        ['title', 'description', 'authors', 'favorite', 'fileCover', 'fileName', 'fileBook'].forEach(props => {
            if (req.body[props]) {
                params[props] = req.body[props]
            }
        })

        await BookModel.findByIdAndUpdate(id, params);
        res.redirect(`/book/${ id }`);
    } catch (error) {
        res.status(500).json();
    }

});

router.post("/delete/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        await BookModel.deleteOne({ _id: id });
        res.redirect(`/book`);
        res.json(true);
    } catch (error) {
        res.status(500).json();
    }
});

router.get("/:id/download-book", (req: any, res: any) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el: any) => el.id === id);
    if (idx !== -1) {
        const { fileBook, fileName } = books[idx];
        res.download(__dirname + "/../" + fileBook, fileName, (err: any) => {
            if (err) {
                res.sendStatus(404).json();
            }
        });
    } else {
        res.sendStatus(404);
    }
});

export default router;

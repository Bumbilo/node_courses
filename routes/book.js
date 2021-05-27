const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');


const store = {
    books: []
};

[1, 2, 3].map(el => {
    const newBook = new Book({
        title: `Book #${el}`,
        description: `This is description for Book #${el}`,
        authors: `Author of Book #${el}`,
        favorite: `${el === 1 ? 'favorite' : 'not favorite'}`,
        fileCover: `File cover Book #${el}`,
        fileName: `./books/Book${el}`
    });
    store.books.push(newBook);
})

router.get('/', (req, res) => {
    const {books} = store;
    res.json(books);
})

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.sendStatus(404);
    }
})

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
    const {books} = store;
    const fileBook = req.file ? req.file.path : '';

    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const newBook = new Book({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    });
    books.push(newBook);
    res.json(newBook);
});

router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
    const {books} = store;

    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {

        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        } = req.body;

        const fileBook = req.file ? req.file.path : '';

        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
            id
        };
        res.json(books[idx]);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("OK");
    } else {
        res.sendStatus(404);
    }
});


router.get('/:id/download-book', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        const {fileBook, fileName} = books[idx];
        res.download(__dirname + '/../' + fileBook, fileName, err => {
            if (err) {
                console.log(err);
                res.sendStatus(404).json();
            }
        });
    } else {
        console.log('404');
        res.sendStatus(404);
    }
});

module.exports = router

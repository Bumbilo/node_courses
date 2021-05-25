const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');
const {Book} = require('./models');
const app = express();
const {BASE_URL, PORT} = process.env;

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

app.use(formData.parse());

app.use(cors());

app.post(`${BASE_URL}/user/login`, (req, res) => {
    res.status = 201;
    res.json({id: 1, mail: "test@mail.ru"})
});

app.get(`${BASE_URL}/books`, (req, res) => {
    const {books} = store;
    res.json(books);
})

app.get(`${BASE_URL}/books/:id`, (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
    }
})

app.post(`${BASE_URL}/books`, (req, res) => {
    const {books} = store;
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
        fileName
    });
    books.push(newBook);
    res.json(newBook);
});

app.put(`${BASE_URL}/books/:id`, (req, res) => {
    const {books} = store;

    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            id
        };
        res.json(books[idx]);
    } else {
        res.status(404);
    }
});

app.delete(`${BASE_URL}/books/:id`, (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("OK");
    } else {
        res.status(404);
    }
});

app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const router = express.Router();
const { Book } = require("../models");
const fileMiddleware = require("../middleware/file");

const store = {
  books: [],
};

[1, 2, 3].map((el) => {
  const newBook = new Book({
    title: `Book #${el}`,
    description: `This is description for Book #${el}`,
    authors: `Author of Book #${el}`,
    favorite: `${el === 1 ? "favorite" : "not favorite"}`,
    fileCover: `File cover Book #${el}`,
    fileName: `./books/Book${el}`,
  });
  store.books.push(newBook);
});

router.get("/", (req, res) => {
  const { books } = store;

  res.render("book/index", {
    title: "Книги",
    books: books,
  });
});

router.get("/create", (req, res) => {
  res.render("book/create", {
    title: "Создать",
    book: {},
  });
});

router.post("/create", fileMiddleware.single("fileBook"), (req, res) => {
  const { books } = store;
  const fileBook = req.file ? req.file.path : "";
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });
  books.push(newBook);
  res.redirect("/book");
});

router.get("/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.render("book/view", {
      title: "Книги",
      book: books[idx],
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.get("/update/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);


  if (idx !== -1) {
    res.render("book/update", {
      title: "Редактирование",
      book: books[idx],
    });
  } else {
    res.status(404).redirect("/404");
  }
});

router.post("/update/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
    };
    res.redirect(`/book/${id}`);
  } else {
    res.status(404).redirect("/404");
  }
});

router.post('/delete/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/book`);
    } else {
        res.status(404).redirect('/404');
    }
});

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
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

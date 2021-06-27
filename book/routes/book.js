const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const fileMiddleware = require("../middleware/file");
const fs = require("fs");
const store = require("../data/books");

router.get("/", async (req, res) => {
  const books = await Book.find();

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
  try {
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
    newBook.save();
    res.redirect("/book");
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const book = await Book.findById(id);
    res.render("book/view", {
      title: "Книги",
      book: book,
      counter: null,
    });
  } catch (error) {
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
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
    };
    fs.writeFileSync("./data/books.json", JSON.stringify(store));
    res.redirect(`/book/${id}`);
  } else {
    res.status(404).redirect("/404");
  }
});

router.post("/delete/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.redirect(`/book`);
  } else {
    res.status(404).redirect("/404");
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

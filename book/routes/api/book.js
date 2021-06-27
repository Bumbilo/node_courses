const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");
const fileMiddleware = require("../../middleware/file");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
  res.json(books);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.json(book);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post("/", fileMiddleware.single("fileBook"), async (req, res) => {
  try {
  const fileBook = req.file ? req.file.path : "";
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  });
  newBook.save()
  res.json(newBook);
  } catch (error) {
    res.status(500).json();
  }
});

router.put("/:id", fileMiddleware.single("fileBook"), async (req, res) => {

  try {
    const { id } = req.params;
    const fileBook = req.file ? req.file.path : "";
    const params = {};

    ['title', 'description', 'authors', 'favorite', 'fileCover', 'fileName', 'fileBook'].forEach(props => {
      if(req.body[props]) {
        params[props] = req.body[props]
      }
    })

    const book = await Book.findByIdAndUpdate(id, params);

    res.json(book);
  } catch (error) {
    res.status(500).json();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteOne({_id: id});
    res.json(true);
  } catch (error) {
    res.status(500).json();
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

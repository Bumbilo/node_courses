import express from 'express';
const router = express.Router();
import { BookModel } from '../../models/book.model';
import { fileMiddleware } from '../../middleware/file';

router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    res.json(book);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post("/", fileMiddleware.single("fileBook"), async (req, res) => {
  try {
    const fileBook = req.file ? req.file.path : "";
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new BookModel({
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
    const params: any = {};

    ['title', 'description', 'authors', 'favorite', 'fileCover', 'fileName', 'fileBook'].forEach(props => {
      if (req.body[props]) {
        params[props] = req.body[props]
      }
    })

    const book = await BookModel.findByIdAndUpdate(id, params);

    res.json(book);
  } catch (error) {
    res.status(500).json();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BookModel.deleteOne({ _id: id });
    res.json(true);
  } catch (error) {
    res.status(500).json();
  }
});

router.get("/:id/download-book", (req, res) => {
  const { books = [] } = {};
  const { id } = req.params;
  const idx = books.findIndex((el: any) => el.id === id);
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

export default router;

import { BookModel } from './models/book.model'
import { Book } from './shared/interfaces/book'

interface CreateBookDto {
  title: Book['title'],
  description: Book['description'],
  authors: Book['authors'],
  favorite: Book['favorite'],
  fileName: Book['fileName'],
  fileCover: Book['fileCover'],
  fileBook: Book['fileBook'],
  date?: Book['date']
}

export class BookService {
  constructor() {
    console.log('new BookService')
  }

  async create(data: CreateBookDto): Promise<Book> {
    const book = new BookModel(data);
    await book.save();
    return book;
  }

  async findAll(): Promise<Book[]> {
    const books = await BookModel.find();
    return books;
  }
}
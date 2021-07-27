import { Book } from './models/Book'

export class BookService {
  constructor() {
    console.log('new BookService')
  }

  async create(data: any) {
    const book = new Book(data);
    await book.save();
    return book;
  }

  async findAll() {
    const books = await Book.find();
    return books;
  }
}
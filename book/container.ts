import "reflect-metadata";
import { Container, decorate, injectable } from 'inversify';
import { BookService } from './book.service';

export const container = new Container();

decorate(injectable(), BookService);
container.bind('BOOK_SERVICE').to(BookService).inSingletonScope();
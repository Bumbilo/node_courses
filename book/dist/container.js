"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const book_service_1 = require("./book.service");
exports.container = new inversify_1.Container();
inversify_1.decorate(inversify_1.injectable(), book_service_1.BookService);
exports.container.bind('BOOK_SERVICE').to(book_service_1.BookService).inSingletonScope();

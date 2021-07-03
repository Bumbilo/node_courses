export interface IBook {
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string,
    fileBook: string,
    id: number,
}


export class Book implements IBook {
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    id: number;

    constructor({
                    title = '',
                    description = "",
                    authors = "",
                    favorite = "",
                    fileCover = "",
                    fileName = "",
                    fileBook = "",
                    id = 0,
                }) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        this.id = id;
    }
}
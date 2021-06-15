# node_courses
node courses
```
db.books.insertMany([
   {
      "title": "Book #123",
      "description": "This is description for Book #123",
      "authors": "Author of Book #1",
      "favorite": "favorite",
      "fileCover": "File cover Book #1",
      "fileName": "./books/Book1",
      "fileBook": "",
      "id": "1623698091912466523383acadd618"
    } ,
   {
      "title": "Book #333",
      "description": "This is description for Book #333",
      "authors": "Author of Book #1",
      "favorite": "favorite",
      "fileCover": "File cover Book #1",
      "fileName": "./books/Book1",
      "fileBook": "",
      "id": "1623698091912466523383acadd823"
    } ,
])



db.books.find({title: "Book #123" });
db.books.find({title: "Book #333" });

db.books.updateOne({_id: "1623698091912466523383acadd823" }, { $set: {"description": "New one description", "authors": "myAuthor"}});
db.books.updateOne({_id: "1623698091912466523383acadd618" }, { $set: {"description": "Second description", "authors": "SecondAuthor"}});

```
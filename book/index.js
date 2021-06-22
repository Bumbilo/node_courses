const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const bookRouter = require("./routes/book");
const apiBookRouter = require("./routes/api/book");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const errorMiddleware = require("./middleware/error");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use("/book", bookRouter);
app.use("/api/book", apiBookRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

app.use(errorMiddleware);

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books'
const HostDb = process.env.DB_HOST || 'mongodb://mongodb:27017/'


async function start() {
  try {
    await mongoose.connect(HostDb, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log('DB Error', error);
  }
};

start();


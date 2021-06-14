const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const bookRouter = require('./routes/book');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const errorMiddleware = require('./middleware/error');
const PORT = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.set("view engine", "ejs");

app.use('/public', express.static(__dirname + "/public"));
app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
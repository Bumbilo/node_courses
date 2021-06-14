const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const counterRouter = require('./routes/counter');
const errorMiddleware = require('./middleware/error');
const PORT = process.env.PORT || 3002;



app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/counter', counterRouter);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
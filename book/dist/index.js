"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("./middleware/passport"));
const book_1 = __importDefault(require("./routes/book"));
const book_2 = __importDefault(require("./routes/api/book"));
const user_1 = __importDefault(require("./routes/api/user"));
const index_1 = __importDefault(require("./routes/index"));
const user_2 = __importDefault(require("./routes/user"));
const error_1 = __importDefault(require("./middleware/error"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set("view engine", "ejs");
app.use("/public", express_1.default.static(__dirname + "/public"));
app.use("/book", book_1.default);
app.use("/api/book", book_2.default);
app.use("/api/user", user_1.default);
app.use("/user", user_2.default);
app.use("/", index_1.default);
app.use(error_1.default);
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books';
const HostDb = process.env.DB_HOST || 'mongodb://mongodb:27017/';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(HostDb, {
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
        }
        catch (error) {
            console.log('DB Error', error);
        }
    });
}
start();

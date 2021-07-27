"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books');
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
    }
});
const allowedTypes = ['text/plain', 'application/pdf'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileMiddleware = multer_1.default({
    storage, fileFilter
});

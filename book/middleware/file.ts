import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/books')
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const allowedTypes = ['text/plain', 'application/pdf'];

const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

export const fileMiddleware = multer({
    storage, fileFilter
});
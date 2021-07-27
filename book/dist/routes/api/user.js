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
const passport_1 = __importDefault(require("../../middleware/passport"));
const User_1 = require("../../models/User");
const router = express_1.default.Router();
router.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("user/login");
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
router.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.cookies;
        const user = yield User_1.User.findById(userId);
        res.render("user/profile", {
            title: "User",
            user,
        });
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
router.post("/login", passport_1.default.authenticate('local', { failureRedirect: '/api/user/login' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.User.findOne({ username, password });
        res.redirect('me');
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
router.post("/signup", (req, res) => {
    try {
        const { username, password, name, emails } = req.body;
        const user = new User_1.User({ username, password, name, emails });
        user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json();
    }
});
exports.default = router;

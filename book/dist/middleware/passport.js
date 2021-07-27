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
const User_1 = require("../models/User");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
function verify(username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ username, password });
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    });
}
const options = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: false,
};
passport_1.default.use("local", new LocalStrategy(options, verify));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport_1.default.deserializeUser(function (id, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findById(id);
            cb(null, user);
        }
        catch (error) {
            return cb(error);
        }
    });
});
exports.default = passport_1.default;

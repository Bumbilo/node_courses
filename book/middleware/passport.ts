import { User } from '../models/User';
import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

async function verify(username: any, password: any, done: any) {
    try {
        const user = await User.findOne({username, password});
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

const options: object = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: false,
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser(function (user: any, cb: any) {
    cb(null, user.id);
});

passport.deserializeUser(async function (id: any, cb: any) {
    try {
        const user = await User.findById(id);
        cb(null, user);
    } catch (error) {
        return cb(error);
    }
});

export default passport;

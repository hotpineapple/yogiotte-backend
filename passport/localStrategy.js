const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {

    passport.use(new LocalStrategy({
        nameField: 'name',
        passwordField: 'password',
    }, async (name, password, done) => {
        try {
            const exUser = await User.findOne({ where: {name}});
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false,{message:'비밀번호 불일치'})
                }
            } else {
                done(null, false, {message:'가입되지 않은 회원입니다'});
            }
        } catch (error) {
            done(error);
        }
    }));
};
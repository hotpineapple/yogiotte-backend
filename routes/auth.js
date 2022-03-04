const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {

    const { username, password } = req.body;
   
    try {
        const exUser = await User.findOne({ where: { name: username } });
        if (exUser) {
            return res.status(409).send('not avaliable');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            name: username,
            password: hash,
        });

        return res.send('register success');
    } catch (error) {

        console.log(error);
        return next();
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return next(authError);
        }
        if (!user) {
            console.log(info.message);
            return res.status(500).send(new Error('no user'));
        }
        return req.login(user, (loginError) => {

            if (loginError) {
                console.log(loginError);
                return res.status(500).send(new Error('password not match'));
                // return next(loginError)
            }
            // console.log(user.dataValues.name);
            return res.status(200).send({ auth: 'true', user: user.dataValues.name });
            // return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res)=> {
    req.logout(); 
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
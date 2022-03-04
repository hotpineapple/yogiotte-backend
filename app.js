const express = require('express');
const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const path = require('path');
const session = require('express-session');
// const nunjucks = require('nunjucks');

const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const router = require('./routes');
const placeRouter = require('./routes/place');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
const passportConfig = require('./passport');
const bodyParser = require('body-parser');

// const { process_params } = require('express/lib/router');
const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use('/', router);
app.use('/place', placeRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
// app.use('/review', reviewRouter);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.listen(app.get('port'), () => {
    console.log(app.get('port')+ '번 포트에서 대기 중');
});
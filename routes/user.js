const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/mypage', isLoggedIn, (req, res) => {
    res.json({
        code: 200,
        payload: 'avaiable'
    });
});

// router.get('/join', isNotLoggedIn, (req, res) => {
//     res.json({
//         code: 200,
//         payload: 'avaiable'
//     });
// });

module.exports = router;
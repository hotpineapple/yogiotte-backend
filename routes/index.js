const express = require('express');
// const jwt = require('jsonwebtoken');

// const { verifyToken } = require('./middlewares');
const { User, Place, Review } = require('../models');

const router = express.Router();

// ... <= ?
router.get('/', (req, res) => {
    res.send('hi..'); 
});

// router.get('/place/:id', (req, res) => {
//     Place.findAll({ where: { id: req.params.id } })
//         .then((place) => {
//             res.json({
//                 code: 200,
//                 payload: place
//             });
//         })
//         .catch((error) => {
//             return res.status(500).json({
//                 code: 500,
//                 message: '서버에러'
//             });
//         });
// })

module.exports = router;
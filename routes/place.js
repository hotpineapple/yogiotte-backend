const express = require('express');
// const jwt = require('jsonwebtoken');

// const { verifyToken } = require('./middlewares');
const { User, Place, Review } = require('../models');
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;

router.get('/one/:id', (req, res) => {
    Place.findOne({ where: { id: req.params.id, img: { [Op.like]: 'http%' }}})
        .then((place) => {
            res.status(200).send(place);
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/hot', (req, res) => {
    const limit = req.query.limit;
    Place.findAll({ where: {img: { [Op.like]: 'http%' }}, offset: limit-10, limit: limit-0 })
        .then((places) => {
            if (limit == 10) res.status(200).send({ more: false, places });
            else res.status(200).send({ more: true, places });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/bar', (req, res) => {
    const limit = req.query.limit;
    Place.findAll({ where: { maintype: '주점', img: { [Op.like]: 'http%' } }, offset: limit-10, limit: limit-0 })
        .then((places) => {
            if (limit == 10) res.status(200).send({ more: false, places });
            else res.status(200).send({ more: true, places });
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/cafe', (req, res) => {
    const limit = req.query.limit;
    Place.findAll({ where: { maintype: '카페', img: { [Op.like]: 'http%' }}, offset: limit-10, limit: limit-0 })
        .then((places) => {
            if (limit == 10) res.status(200).send({ more: false, places });
            else res.status(200).send({ more: true, places });
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/restaurant', (req, res) => {
    const limit = req.query.limit;
    Place.findAll({ where: { maintype: '음식점',img: { [Op.like]: 'http%' } }, offset: limit-10, limit: limit-0 })
        .then((places) => {
            if (limit == 10) res.status(200).send({ more: false, places });
            else res.status(200).send({ more: true, places });
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/search/:keyword', (req, res) => {
    const limit = req.query.limit;
    Place.findAll({ where: { name: { [Op.like]: '%' + req.params.keyword + '%' } }, offset: limit-10, limit: limit-0 })
        .then((places) => {
            if (limit == 10) {
                console.log('첫페이지 조회');
                res.status(200).send({ more: false, places });
            }
            else res.status(200).send({ more: true, places });
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

router.get('/location/:code', (req, res) => {
    // console.log('..?');
    Place.findAll({ where: { code: req.params.code }, /*offset: 0, limit: limit-0*/  })
        .then((places) => {
            res.status(200).send(places);
        })
        .catch((error) => {
            return res.status(500).json({
                code: 500,
                message: '서버에러'
            });
        });
});

module.exports = router;
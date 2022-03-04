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
    Place.findAll({ offset: 0, limit: 10, where: {img: { [Op.like]: 'http%' }}  })
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

router.get('/bar', (req, res) => {
    Place.findAll({ where: { maintype: '주점', img: { [Op.like]: 'http%' } }, offset: 0, limit: 10  })
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

router.get('/cafe', (req, res) => {
    Place.findAll({ where: { maintype: '카페', img: { [Op.like]: 'http%' }}, offset: 0, limit: 10 })
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

router.get('/restaurant', (req, res) => {
    Place.findAll({ where: { maintype: '음식점',img: { [Op.like]: 'http%' } }, offset: 0, limit: 10  })
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

router.get('/search/:keyword', (req, res) => {
    
    Place.findAll({ where: { name: { [Op.like]: '%' + req.params.keyword + '%' } }, offset: 0, limit: 10  })
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

router.get('/location/:code', (req, res) => {
    console.log('..?');
    Place.findAll({ where: { code: req.params.code }, offset: 0, limit: 10  })
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
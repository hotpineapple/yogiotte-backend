const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Place = require('./place');
const Review = require('./review');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Place = Place;
db.Review = Review;

User.init(sequelize);
Place.init(sequelize);
Review.init(sequelize);

User.associate(db);
Place.associate(db);
Review.associate(db);

module.exports = db;

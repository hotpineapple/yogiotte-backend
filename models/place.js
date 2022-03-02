const { contextOrFrameLookup } = require('nunjucks/src/runtime');
const Sequelize = require('sequelize');

module.exports = class Place extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            maintype: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            subtype: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lat: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lng: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Place',
            tableName: 'places',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    
    static associate(db) {
        db.User.belongsToMany(db.User, {
            foreignKey: 'likeId',
            as: 'bookmarkedBy',
            through: 'Like',
        });
     }
};
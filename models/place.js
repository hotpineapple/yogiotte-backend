const { contextOrFrameLookup } = require('nunjucks/src/runtime');
const Sequelize = require('sequelize');

module.exports = class Place extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            placename: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            placetype: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            location: {
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
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db) { }
};
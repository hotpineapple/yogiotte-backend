const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            provider: {
                type: Sequelize.STRING(40),
                allowNull: false,
                defaultValue: 'local',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Review);
        db.User.belongsToMany(db.Place, {
            foreignKey: 'likeId',
            as: 'myplace',
            through: 'Like',
        });
    }
};
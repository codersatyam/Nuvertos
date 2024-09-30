'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class compounds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    
    }
    compounds.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        CompoundName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        CompounrDescription: {
            allowNull: false,
            type: DataTypes.STRING
        },
        strImageSource: {
            allowNull: false,
            type: DataTypes.STRING
        },
        strImageAttribution: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'compounds',
    });
    return compounds;
};
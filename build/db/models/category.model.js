"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CATEGORY_TABLE = 'categories';
const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize_1.Sequelize.fn('NOW'),
    },
};
class Category extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        };
    }
}
module.exports = { Category, CategorySchema, CATEGORY_TABLE };

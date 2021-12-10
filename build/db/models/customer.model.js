"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { USER_TABLE } = require('./user.model');
const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'last_name',
    },
    phone: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize_1.Sequelize.fn('NOW'),
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};
class Customer extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'customerId'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        };
    }
}
module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };

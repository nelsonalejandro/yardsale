"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { CUSTOMER_TABLE } = require('./customer.model');
const ORDER_TABLE = 'orders';
const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'state',
        defaultValue: 'pending',
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize_1.Sequelize.fn('NOW'),
    }
};
class Order extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.Customer, {
            as: 'customer',
        });
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        };
    }
}
module.exports = { Order, OrderSchema, ORDER_TABLE };

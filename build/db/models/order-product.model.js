"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');
const ORDER_PRODUCT_TABLE = 'orders_products';
const OrderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
        defaultValue: sequelize_1.Sequelize.fn('NOW'),
    },
    cuantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        field: 'product_id',
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};
class OrderProduct extends sequelize_1.Model {
    static associate(models) {
        //
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        };
    }
}
module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };

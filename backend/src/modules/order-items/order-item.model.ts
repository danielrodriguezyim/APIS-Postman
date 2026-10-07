import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

import { sequelize } from "../../config/database";

export class OrderItem extends Model<
InferAttributes<OrderItem>,
InferCreationAttributes<OrderItem>
> {
    declare id: CreationOptional<number>;
    declare orderID: number;
    declare bicycleID: number;
    declare quantity: number;
    declare unitPrice: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bicycleID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 }
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "order_items", modelName: "OrderItem", timestamps: true
    }
);
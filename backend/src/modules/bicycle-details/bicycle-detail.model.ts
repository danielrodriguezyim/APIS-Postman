import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";

  import { sequelize } from "../../config/database";

  export class BicycleDetail extends Model<
    InferAttributes<BicycleDetail>,
    InferCreationAttributes<BicycleDetail>
  > {
    declare id: CreationOptional<number>;

    declare bicycleID: number;

    declare frameMaterial: "Aluminum" | "Carbon" | "Steel" | "Titanium";

    declare wheelSize: number;

    declare weight: number;

    declare suspension: CreationOptional<string | null>;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;
}

BicycleDetail.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        bicycleID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
        },
        frameMaterial: {
            type: DataTypes.ENUM("Aluminum", "Carbon", "Steel", "Titanium"),
            allowNull: false,
        },
        wheelSize: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        },
        suspension: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize, tableName: "bicycle-details", modelName: "BicycleDetail", timestamps: true,
    }
);

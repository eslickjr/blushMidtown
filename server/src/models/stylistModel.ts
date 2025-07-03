import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { PricingLevels } from './pricingLevelModel'; // Adjust the import path as necessary

// Define the attributes interface
interface StylistAttributes {
    id: number;
    name: string;
    src: string; // The image source URL for the stylist's profile picture
    pricingLevelId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface StylistCreationAttributes extends Optional<StylistAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// User model class definition
export class Stylists extends Model<StylistAttributes, StylistCreationAttributes> 
    implements StylistAttributes {
    public id!: number;
    public name!: string;
    public src!: string; // The image source URL for the stylist's profile picture
    public pricingLevelId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function StylistFactory(sequelize: Sequelize): typeof Stylists {
    Stylists.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            src: {
                type: DataTypes.STRING,
                allowNull: false, // Ensure src is always provided
            },
            pricingLevelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: PricingLevels, // Reference to the PricingLevels model
                    key: 'id',
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true, // Allow null for createdAt if not set
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true, // Allow null for updatedAt if not set
            },
        },
        {
            sequelize,
            modelName: 'Stylists',
            tableName: 'stylists', // Specify the table name if different
            timestamps: true, // Disable timestamps if not needed
        }
    );

    return Stylists;
}

Stylists.belongsTo(PricingLevels, {
    foreignKey: 'pricingLevelId',
    as: 'pricingLevel', // Alias for the association
});

PricingLevels.hasMany(Stylists, {
    foreignKey: 'pricingLevelId',
    as: 'stylists', // Alias for the association
});
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { PricingService } from './pricingServiceModel';
import { Services } from './serviceModel';
import { AddServices } from './addServiceModel';

// Define the attributes interface
interface PricingLevelAttributes {
    id: number;
    name: string;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface PricingLevelCreationAttributes extends Optional<PricingLevelAttributes, 'id'> {}

// User model class definition
export class PricingLevels extends Model<PricingLevelAttributes, PricingLevelCreationAttributes> 
    implements PricingLevelAttributes {
    public id!: number;
    public name!: string;
}

export function PricingLevelFactory(sequelize: Sequelize): typeof PricingLevels {
    PricingLevels.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'PricingLevels',
            tableName: 'pricing_levels', // Specify the table name if different
            timestamps: false, // Disable timestamps if not needed
        }
    );

    return PricingLevels;
}

PricingLevels.belongsToMany(Services, {
    through: PricingService,
    foreignKey: 'pricingLevelId',
    otherKey: 'serviceId',
});
PricingLevels.belongsToMany(AddServices, {
    through: PricingService,
    foreignKey: 'pricingLevelId',
    otherKey: 'addServiceId',
});
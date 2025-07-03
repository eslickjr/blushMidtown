import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { ServiceTypes } from './serviceTypeModel';
import { PricingLevels } from './pricingLevelModel';
import { PricingService } from './pricingServiceModel';

// Define the attributes interface
interface ServiceAttributes {
    id: number;
    type: string;
    priceBottom: number;
    priceTop: number;
    duration: number; // Assuming duration is a required field, add it here if needed
    description: string;
    serviceTypeId: number; // Foreign key to ServiceTypes
    firstTime: boolean;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// User model class definition
export class Services extends Model<ServiceAttributes, ServiceCreationAttributes> 
    implements ServiceAttributes {
    public id!: number;
    public type!: string;
    public priceBottom!: number;
    public priceTop!: number;
    public duration!: number; // Assuming duration is a required field, add it here if needed
    public description!: string;
    public serviceTypeId!: number; // Foreign key to ServiceTypes
    public firstTime!: boolean; // Assuming firstTime is a boolean field, add it here if needed
}

export function ServiceFactory(sequelize: Sequelize): typeof Services {
    Services.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            priceBottom: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            priceTop: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            duration: {
                type: DataTypes.INTEGER, // Assuming duration is in minutes or seconds
                allowNull: false, // Set to false if duration is required
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            serviceTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: ServiceTypes, // Reference to the ServiceTypes model
                    key: 'id',
                },
            },
            firstTime: {
                type: DataTypes.BOOLEAN,
                allowNull: false, // Assuming firstTime is a required field
            },
        },
        {
            sequelize,
            modelName: 'Services',
            tableName: 'services', // Specify the table name if different
            timestamps: false, // Disable timestamps if not needed
        }
    );

    return Services;
}

Services.belongsTo(ServiceTypes, {
    foreignKey: 'serviceTypeId',
    as: 'serviceType', // Alias for the association
});

Services.belongsToMany(PricingLevels, {
    through: PricingService, // Specify the join table name
    foreignKey: 'serviceId',
    otherKey: 'pricingLevelId',
});


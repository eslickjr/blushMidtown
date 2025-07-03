import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Appointments } from './appointmentModel';
import { PricingLevels } from './pricingLevelModel';
import { PricingService } from './pricingServiceModel';
import { AppointmentAddService } from './appointmentAddServiceModel';
import { AddServiceMatch } from './addServiceMatchModel';

// Define the attributes interface
interface AddServiceAttributes {
    id: number;
    type: string;
    priceBottom: number;
    priceTop: number;
    description: string;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface AddServiceCreationAttributes extends Optional<AddServiceAttributes, 'id'> {}

// User model class definition
export class AddServices extends Model<AddServiceAttributes, AddServiceCreationAttributes> 
    implements AddServiceAttributes {
    public id!: number;
    public type!: string;
    public priceBottom!: number;
    public priceTop!: number;
    public description!: string;
}

export function AddServiceFactory(sequelize: Sequelize): typeof AddServices {
    AddServices.init(
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
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'AddServices',
            tableName: 'add_services', // Specify the table name if different
            timestamps: false, // Disable timestamps if not needed
        }
    );

    return AddServices;
}

AddServices.belongsToMany(Appointments, {
    through: AppointmentAddService,
    foreignKey: 'addServiceId',
    otherKey: 'appointmentId',
    as: 'appointments',
});

AddServices.belongsToMany(PricingLevels, {
    through: PricingService,
    foreignKey: 'addServiceId',
    otherKey: 'pricingLevelId',
    as: 'pricingLevels',
});

AddServices.belongsToMany(AddServiceMatch, {
    through: AddServiceMatch,
    foreignKey: 'addServiceId',
    otherKey: 'matchId',
    as: 'matches',
});
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Clients } from './clientModel'; // Adjust the import path as necessary
import { ServiceTypes } from './serviceTypeModel'; // Adjust the import path as necessary
import { Services } from './serviceModel';
import { Stylists } from './stylistModel';
import { AddServices } from './addServiceModel'; // Adjust the import path as necessary
import { AppointmentAddService } from './appointmentAddServiceModel'; // Adjust the import path as necessary

// Define the attributes interface
interface AppointmentAttributes {
    id: number;
    clientId: number;
    serviceTypeId?: number; // Optional service type ID
    serviceId?: number; // Optional service ID
    stylistId?: number; // Optional stylist ID
    startTime: Date; // Optional start time for the appointment
    endTime: Date; // Optional end time for the appointment
    createdAt?: Date;
    updatedAt?: Date;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// User model class definition
export class Appointments extends Model<AppointmentAttributes, AppointmentCreationAttributes> 
    implements AppointmentAttributes {
    public id!: number;
    public clientId!: number;
    public serviceTypeId?: number; // Optional service type ID
    public serviceId?: number; // Optional service ID
    public stylistId?: number; // Optional stylist ID
    public startTime!: Date; // Optional start time for the appointment
    public endTime!: Date; // Optional end time for the appointment
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public setAddServices!: (addServices: AddServices[] | number[]) => Promise<void>; // Method to set associated add services
    public getAddServices!: () => Promise<AddServices[]>; // Method to get associated add services
    public addAddService!: (service: AddServices | number) => Promise<void>; // Method to add associated add services
    public removeAddService!: (service: AddServices | number) => Promise<void>; // Method to remove associated add services
}

export function AppointmentFactory(sequelize: Sequelize): typeof Appointments {
    Appointments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Clients, // Reference to the Client model
                    key: 'id',
                },
            },
            serviceTypeId: {
                type: DataTypes.INTEGER,
                allowNull: true, // Allow null for optional service type
                references: {
                    model: ServiceTypes, // Reference to the ServiceType model
                    key: 'id',
                },
            },
            serviceId: {
                type: DataTypes.INTEGER,
                allowNull: true, // Allow null for optional service
                references: {
                    model: Services, // Reference to the Service model
                    key: 'id',
                },
            },
            stylistId: {
                type: DataTypes.INTEGER,
                allowNull: true, // Allow null for optional stylist
                references: {
                    model: Stylists, // Reference to the Stylist model
                    key: 'id',
                },
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: false, // Start time is required
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: false, // End time is required
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
            modelName: 'Appointments',
            tableName: 'appointments', // Specify the table name if different
            timestamps: true, // Disable timestamps if not needed
        }
    );

    return Appointments;
}

// Define associations
Appointments.belongsTo(Clients, {
    foreignKey: 'clientId',
    as: 'client', // Alias for the association
});
Appointments.belongsTo(ServiceTypes, {
    foreignKey: 'serviceTypeId',
    as: 'serviceType', // Alias for the association
});
Appointments.belongsTo(Services, {
    foreignKey: 'serviceId',
    as: 'service', // Alias for the association
});
Appointments.belongsTo(Stylists, {
    foreignKey: 'stylistId',
    as: 'stylist', // Alias for the association
});
Appointments.belongsToMany(AddServices, {
    through: AppointmentAddService, // Specify the join table name
    foreignKey: 'appointmentId',
    otherKey: 'addServiceId',
    as: 'addServices', // Alias for the association
});

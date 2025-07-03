import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Services } from './serviceModel'; // Import the Services model

// Define the attributes interface
interface ServiceTypeAttributes {
    id: number;
    type: string;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface ServiceTypeCreationAttributes extends Optional<ServiceTypeAttributes, 'id'> {}

// User model class definition
export class ServiceTypes extends Model<ServiceTypeAttributes, ServiceTypeCreationAttributes> 
    implements ServiceTypeAttributes {
    public id!: number;
    public type!: string;
}

export function ServiceFactory(sequelize: Sequelize): typeof ServiceTypes {
    ServiceTypes.init(
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
        },
        {
            sequelize,
            modelName: 'ServiceTypes',
            tableName: 'service_types', // Specify the table name if different
            timestamps: false, // Disable timestamps if not needed
        }
    );

    return ServiceTypes;
}

ServiceTypes.hasMany(Services, {
    foreignKey: 'serviceTypeId',
    as: 'services', // Alias for the association
});
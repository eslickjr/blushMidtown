import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Services } from './serviceModel'; // Import the Services model

// Define the attributes interface
interface NewServiceAttributes {
    id: number;
    serviceId: number;
    priceTop: number;
    priceBottom: number;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface NewServiceCreationAttributes extends Optional<NewServiceAttributes, 'id'> {}

// User model class definition
export class NewServices extends Model<NewServiceAttributes, NewServiceCreationAttributes> 
    implements NewServiceAttributes {
    public id!: number;
    public serviceId!: number;
    public priceTop!: number;
    public priceBottom!: number;
}

export function NewServiceFactory(sequelize: Sequelize): typeof NewServices {
    NewServices.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            serviceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Services, // Reference to the Services model
                    key: 'id',
                },
            },
            priceBottom: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            priceTop: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'NewServices',
            tableName: 'new_services', // Specify the table name if different
            timestamps: false, // Disable timestamps if not needed
        }
    );

    return NewServices;
}
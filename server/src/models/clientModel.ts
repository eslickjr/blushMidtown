import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes interface
interface ClientAttributes {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailOptIn: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// User model class definition
export class Clients extends Model<ClientAttributes, ClientCreationAttributes> 
    implements ClientAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public emailOptIn!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    toJSON() {
        const attributes = { ...this.get() };
        delete attributes.password; // Exclude password from JSON output
        return attributes;
    }
}

export function ClientFactory(sequelize: Sequelize): typeof Clients {
    Clients.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emailOptIn: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Clients',
            tableName: 'clients', // Specify the table name if different
            timestamps: true, // Enable timestamps for createdAt and updatedAt
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    );

    return Clients;
}
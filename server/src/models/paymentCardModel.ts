import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Clients } from './clientModel'; // Adjust the import path as necessary

// Define the attributes interface
interface PaymentCardAttributes {
    id: number;
    clientId: number;
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string; // Format: 'MM/YY'
    zipCode: string;
    isPrimary: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define creation attributes interface, making id, createdAt, and updatedAt optional for creation
interface PaymentCardCreationAttributes extends Optional<PaymentCardAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// User model class definition
export class PaymentCards extends Model<PaymentCardAttributes, PaymentCardCreationAttributes> 
    implements PaymentCardAttributes {
    public id!: number;
    public clientId!: number;
    public cardNumber!: string;
    public cardHolderName!: string;
    public expirationDate!: string; // Format: 'MM/YY'
    public zipCode!: string;
    public isPrimary!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function PaymentCardFactory(sequelize: Sequelize): typeof PaymentCards {
    PaymentCards.init(
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
            cardNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^\d{16}$/, // Validate for 16-digit card number
                },
            },
            cardHolderName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expirationDate: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^(0[1-9]|1[0-2])\/\d{2}$/, // Validate format MM/YY
                },
            },
            zipCode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^\d{5}$/, // Validate for 5-digit zip code
                },
            },
            isPrimary: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false, // Default to false if not specified
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
            modelName: 'PaymentCards',
            tableName: 'payment_cards', // Specify the table name if different
            timestamps: true, // Disable timestamps if not needed
        }
    );

    return PaymentCards;
}

PaymentCards.belongsTo(Clients, {
    foreignKey: 'clientId',
    as: 'client', // Alias for the association
});
Clients.hasMany(PaymentCards, {
    foreignKey: 'clientId',
    as: 'paymentCards', // Alias for the association
});
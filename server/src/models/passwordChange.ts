import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { Clients } from './clientModel.js';

export class PasswordChange extends Model {
    public id!: number;
    public clientId!: number;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PasswordChange.init(
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
                model: Clients,
                key: 'id',
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'PasswordChange',
        timestamps: true,
    }
);

PasswordChange.belongsTo(Clients, {
    foreignKey: 'clientId',
    as: 'client',
});

export async function findByIdAndUpdate(clientId: number, update: { password: string; }): Promise<Clients | null> {
    const client = await Clients.findByPk(clientId);

    if (client) {
        await client.update(update);
        return client.reload();
    }

    return null;
}
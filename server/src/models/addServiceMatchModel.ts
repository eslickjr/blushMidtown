import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { AddServices } from './addServiceModel.js';

export class AddServiceMatch extends Model {
    public id!: number;
    public addServiceId!: number;
    public matchId!: number;
}

AddServiceMatch.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        addServiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AddServices,
                key: 'id',
            },
        },
        matchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AddServices,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'AddServiceMatch',
        tableName: 'add_service_matches', // Specify the table name if different
        timestamps: false,
    }
);

// export async function findByAddServiceIds(
//     addServiceId1: number,
//     addServiceId2: number
// ): Promise<AddServiceMatch | null> {
//     return AddServiceMatch.findOne({
//         where: {
//             addServiceId1,
//             addServiceId2,
//         },
//     });
// }
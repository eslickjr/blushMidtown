import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { PricingLevels } from './pricingLevelModel.js';
import { AddServices } from './addServiceModel.js';

export class PricingAddService extends Model {
    public id!: number;
    public pricingId!: number;
    public addServiceId!: number;
    public price!: number;
}

PricingAddService.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pricingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PricingLevels,
                key: 'id',
            },
        },
        addServiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AddServices,
                key: 'id',
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'PricingAddService',
        tableName: 'pricing_add_services', // Specify the table name if different
        timestamps: false,
    }
);

PricingAddService.belongsTo(PricingLevels, {
    foreignKey: 'pricingId',
    as: 'pricing',
});

PricingAddService.belongsTo(AddServices, {
    foreignKey: 'addServiceId',
    as: 'addService',
});

// export async function findByPricingAndAddService(
//     pricingId: number,
//     addServiceId: number
// ): Promise<PricingAddService | null> {
//     return PricingAddService.findOne({
//         where: {
//             pricingId,
//             addServiceId,
//         },
//         include: [
//             { model: PricingLevels, as: 'pricing' },
//             { model: AddServices, as: 'addService' },
//         ],
//     });
// }
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { PricingLevels } from './pricingLevelModel.js';
import { Services } from './serviceModel.js';

export class PricingService extends Model {
    public id!: number;
    public pricingId!: number;
    public serviceId!: number;
    public price!: number;
}

PricingService.init(
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
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Services,
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
        modelName: 'PricingService',
        tableName: 'pricing_services', // Specify the table name if different
        timestamps: false,
    }
);

PricingService.belongsTo(PricingLevels, {
    foreignKey: 'pricingId',
    as: 'pricing',
});

PricingService.belongsTo(Services, {
    foreignKey: 'serviceId',
    as: 'service',
});

// export async function findByPricingAndService(pricingId: number, serviceId: number): Promise<PricingService | null> {
//     return PricingService.findOne({
//         where: {
//             pricingId,
//             serviceId,
//         },
//         include: [
//             { model: PricingLevels, as: 'pricing' },
//             { model: Services, as: 'service' },
//         ],
//     });
// }
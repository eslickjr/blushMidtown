import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { Appointments } from './appointmentModel.js';
import { AddServices } from './addServiceModel.js';

export class AppointmentAddService extends Model {
    public id!: number;
    public appointmentId!: number;
    public addServiceId!: number;
}

AppointmentAddService.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Appointments,
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
    },
    {
        sequelize,
        modelName: 'AppointmentAddService',
        tableName: 'appointment_add_services', // Specify the table name if different
        timestamps: false,
    }
);

AppointmentAddService.belongsTo(Appointments, {
    foreignKey: 'appointmentId',
    as: 'appointment',
});

AppointmentAddService.belongsTo(AddServices, {
    foreignKey: 'addServiceId',
    as: 'addService',
});

// export async function findByAppointmentAndAddService(
//     appointmentId: number,
//     addServiceId: number
// ): Promise<AppointmentAddService | null> {
//     return AppointmentAddService.findOne({
//         where: {
//             appointmentId,
//             addServiceId,
//         },
//     });
// }
// }
// export async function findByAppointmentId(appointmentId: number): Promise<AppointmentAddService[]> {
//     return AppointmentAddService.findAll({
//         where: {
//             appointmentId,
//         },
//         include: [
//             { model: Appointments, as: 'appointment' },
//             { model: AddServices, as: 'addService' },
//         ],
//     });
// }

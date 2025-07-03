export default interface AppointmentI {
    id?: number; // Optional for creation
    clientId: number;
    serviceTypeId: number;
    serviceId: number;
    addServiceIds?: number[]; // Optional for additional services
    stylistId: number;
    startTime: Date;
    endTime: Date;
}
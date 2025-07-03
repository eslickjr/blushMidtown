export interface ServiceI {
    id: number;
    type: string;
    priceBottom: number;
    priceTop: number;
    desc?: string;
    addOn?: boolean;
    duration: number; // Duration in minutes
    serviceTypeId: number; // Foreign key to ServiceTypes
}

export interface ServiceTypeI {
    id: number;
    name: string;
}
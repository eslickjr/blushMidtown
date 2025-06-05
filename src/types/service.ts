export interface ServiceI {
    type: string;
    priceBottom: number;
    priceTop: number;
    desc?: string;
    addOn?: boolean;
}

export default interface ServiceTypeI {
    name: string;
    services: ServiceI[];
}
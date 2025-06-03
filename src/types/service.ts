export interface Service {
    type: string;
    priceBottom: number;
    priceTop: number;
    desc?: string;
    addOn?: boolean;
}

export default interface ServiceType {
    name: string;
    services: Service[];
}
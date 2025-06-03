export interface Service {
    name: string;
    type: string;
    price: number;
}

export interface AddService {
    type: string;
    price: number;
}

export interface Stylist {
    name: string;
    src: string;
}

export default interface Basket {
    service: Service;
    addServices: AddService[];
    stylist: Stylist;
    date: Date | undefined;
    timeEnd: string | undefined;
    note: string;
}
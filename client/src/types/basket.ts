export interface BasketServiceI {
    name: string;
    type: string;
    price: number;
}

export interface BasketAddServiceI {
    type: string;
    price: number;
}

export interface BasketStylistI {
    name: string;
    src: string;
}

export default interface BasketI {
    service: BasketServiceI;
    addServices: BasketAddServiceI[];
    stylist: BasketStylistI;
    date: Date | undefined;
    timeEnd: string | undefined;
    note: string;
}
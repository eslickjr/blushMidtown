export default interface AddServiceI {
    id: number;
    type: string;
    priceBottom: number;
    priceTop: number;
    desc?: string;
    match: number[];
}
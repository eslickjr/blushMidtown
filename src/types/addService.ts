export default interface AddServiceI {
    type: string;
    priceBottom: number;
    priceTop: number;
    desc?: string;
    match?: string[];
}
export default interface StylistI {
    id: number;
    name: string; // The name of the stylist
    src: string; // The image source URL for the stylist's profile picture
    pricingLevelId: number; // The ID of the pricing level associated with the stylist
}
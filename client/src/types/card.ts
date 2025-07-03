export default interface CardI {
    id?: number; // Optional for creation
    clientId: number;
    cardHolderName: string;
    cardNumber: string;
    cardType?: string;
    expiryDate: string;
    zipCode: string;
    isPrimary: boolean;
}
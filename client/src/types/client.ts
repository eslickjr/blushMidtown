export default interface ClientI {
    id?: number; // Optional for creation
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string; // Optional for creation, required for login
    emailOptIn: boolean; // Whether the client has opted in for email communications
}
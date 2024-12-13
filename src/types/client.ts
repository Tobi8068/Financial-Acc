export interface ClientData {
    id: string;
    client: {
        name: string;
        avatar: string;
    };
    dateCreated: string;
    address: string;
    billingAddress: string;
    shippingAddress: string;
}
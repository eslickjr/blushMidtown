interface ClientI {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    emailOptIn: boolean;
}

const createClient = async (client: ClientI) => {
    try {
        const response = await fetch('/api/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Create the appointment
        const clientData = await response.json();
        return clientData;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

const loginClient = async (email: string, password: string) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Login the client
        const tokenData = await response.json();
        return tokenData;
    } catch (error) {
        console.error('Error logging in client:', error);
        throw error;
    }
}

const updateClient = async (clientId: number, client: ClientI) => {
    try {
        if (client.password) {
            try {
                const clientPasword = await fetch('/api/client/change-password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ clientId, password: client.password }),
                });

                if (!clientPasword.ok) {
                    throw new Error(`HTTP error! status: ${clientPasword.status}`);
                }
            } catch (error) {
                console.error('Error changing password:', error);
                throw error;
            }
        }

        const response = await fetch(`/api/client/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update the appointment
        const updatedClientData = await response.json();
        return updatedClientData;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}

export { createClient, loginClient, updateClient };
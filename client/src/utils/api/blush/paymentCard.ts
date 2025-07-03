import CardI from '../../../types/card';

const createPaymentCard = async (card: CardI) => {
    try {
        const response = await fetch(`api/paymentCard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating card:', error);
        throw error;
    }
}

const getPaymentCardsByClientId = async (clientId: number) => {
    try {
        const response = await fetch(`/api/paymentCard/client/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving payment cards:', error);
        throw error;
    }
}

const getPaymentCard = async (cardId: number) => {
    try {
        const response = await fetch(`/api/paymentCard/${cardId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving payment card:', error);
        throw error;
    }
}

const updatePaymentCard = async (cardId: number, card: CardI) => {
    try {
        const response = await fetch(`/api/paymentCard/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating payment card:', error);
        throw error;
    }
}

const deletePaymentCard = async (cardId: number) => {
    try {
        const response = await fetch(`/api/paymentCard/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { message: 'Payment card deleted successfully.' };
    } catch (error) {
        console.error('Error deleting payment card:', error);
        throw error;
    }
}

export { createPaymentCard, getPaymentCardsByClientId, getPaymentCard, updatePaymentCard, deletePaymentCard };
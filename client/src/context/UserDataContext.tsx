import { createContext, useContext, useState, ReactNode } from 'react';
import AppointmentI from 'types/appointment';
import CardI from 'types/card';

interface AppointmentsContextType {
    appointmentsContext: AppointmentI[];
    setAppointmentsContext: (appointments: AppointmentI[]) => void;
}

interface PaymentCardsContextType {
    paymentCardsContext: CardI[];
    setPaymentCardsContext: (paymentCards: CardI[]) => void;
}

export const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);
export const PaymentCardsContext = createContext<PaymentCardsContextType | undefined>(undefined);

export const useAppointments = () => {
    const context = useContext(AppointmentsContext);
    if (!context) throw new Error('useAppointments must be used within an AppointmentsProvider');
    return context;
}

export const usePaymentCards = () => {
    const context = useContext(PaymentCardsContext);
    if (!context) throw new Error('usePaymentCards must be used within a PaymentCardsProvider');
    return context;
};

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointmentsContext, setAppointmentsContext] = useState<AppointmentI[]>([]);
    const [paymentCardsContext, setPaymentCardsContext] = useState<CardI[]>([]);

    return (
        <AppointmentsContext.Provider value={{ appointmentsContext, setAppointmentsContext }}>
            <PaymentCardsContext.Provider value={{ paymentCardsContext, setPaymentCardsContext }}>
                {children}
            </PaymentCardsContext.Provider>
        </AppointmentsContext.Provider>
    );
};
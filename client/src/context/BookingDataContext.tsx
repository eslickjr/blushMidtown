import { createContext, useContext, useState, ReactNode } from 'react';
import StylistI from 'types/stylist';
import { ServiceI, ServiceTypeI } from 'types/service';
import AddServiceI from 'types/addService';

interface StylistsContextType {
    stylistsContext: StylistI[];
    setStylistsContext: (stylists: StylistI[]) => void;
}

interface ServicesContextType {
    servicesContext: ServiceI[];
    setServicesContext: (services: ServiceI[]) => void;
    serviceTypeIdContext: number;
    setServiceTypeIdContext: (serviceTypeId: number) => void;
}

interface ServiceTypesContextType {
    serviceTypesContext: ServiceTypeI[];
    setServiceTypesContext: (serviceTypes: ServiceTypeI[]) => void;
}

interface AddServicesContextType {
    addServicesContext: AddServiceI[];
    setAddServicesContext: (addServices: AddServiceI[]) => void;
}

interface firstTimeServicesContextType {
    firstTimeServicesContext: ServiceI[];
    setFirstTimeServicesContext: (firstTimeServices: ServiceI[]) => void;
}

export const StylistsContext = createContext<StylistsContextType | undefined>(undefined);
export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);
export const ServiceTypesContext = createContext<ServiceTypesContextType | undefined>(undefined);
export const AddServicesContext = createContext<AddServicesContextType | undefined>(undefined);
export const FirstTimeServicesContext = createContext<firstTimeServicesContextType | undefined>(undefined);

export const useStylists = () => {
    const context = useContext(StylistsContext);
    if (!context) throw new Error('useStylists must be used within a StylistsProvider');
    return context;
}

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) throw new Error('useServices must be used within a ServicesProvider');
    return context;
};

export const useServiceTypes = () => {
    const context = useContext(ServiceTypesContext);
    if (!context) throw new Error('useServiceTypes must be used within a ServiceTypesProvider');
    return context;
};

export const useAddServices = () => {
    const context = useContext(AddServicesContext);
    if (!context) throw new Error('useAddServices must be used within an AddServicesProvider');
    return context;
};

export const useFirstTimeServices = () => {
    const context = useContext(FirstTimeServicesContext);
    if (!context) throw new Error('useFirstTimeServices must be used within a FirstTimeServicesProvider');
    return context;
};

export const BookingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stylistsContext, setStylistsContext] = useState<StylistI[]>([]);
    const [servicesContext, setServicesContext] = useState<ServiceI[]>([]);
    const [serviceTypeIdContext, setServiceTypeIdContext] = useState<number>(-1);
    const [serviceTypesContext, setServiceTypesContext] = useState<ServiceTypeI[]>([]);
    const [addServicesContext, setAddServicesContext] = useState<AddServiceI[]>([]);
    const [firstTimeServicesContext, setFirstTimeServicesContext] = useState<ServiceI[]>([]);

    return (
        <StylistsContext.Provider value={{ stylistsContext, setStylistsContext }}>
            <ServicesContext.Provider value={{ servicesContext, setServicesContext, serviceTypeIdContext, setServiceTypeIdContext }}>
                <FirstTimeServicesContext.Provider value={{ firstTimeServicesContext, setFirstTimeServicesContext }}>
                    <ServiceTypesContext.Provider value={{ serviceTypesContext, setServiceTypesContext }}>
                        <AddServicesContext.Provider value={{ addServicesContext, setAddServicesContext }}>
                            {children}
                        </AddServicesContext.Provider>
                    </ServiceTypesContext.Provider>
                </FirstTimeServicesContext.Provider>
            </ServicesContext.Provider>
        </StylistsContext.Provider>
    );
};
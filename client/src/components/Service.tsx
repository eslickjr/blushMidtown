import { useEffect } from "react";
import { getServicesByServiceTypeId } from "utils/api/blush/service";
import { useServices } from "context/BookingDataContext";

interface ServiceProps {
    setServiceType: (id: number) => void;
    setService: (serviceId: number) => void;
    serviceType: number;
}

export default function Service({ setServiceType, setService, serviceType }: ServiceProps) {
    const { servicesContext, setServicesContext, serviceTypeIdContext, setServiceTypeIdContext } = useServices();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const services = await getServicesByServiceTypeId(serviceType);
                setServicesContext(services);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        if (serviceTypeIdContext !== serviceType) {
            setServiceTypeIdContext(serviceType);
            fetchServices();
        }
    }, []);
    
    const serviceList = () => {
        return (
            <ul id="bookOnlineServiceList">
                {servicesContext.map((service, index) => (
                    <li className="bookOnlineServiceItem" key={index} onClick={() => {setService(service.id)}}>
                        <h3 className="bookOnlineServiceItemHeader">{service.type}</h3>
                        <p className="bookOnlineServiceItemPrice">Price: ${service.priceBottom < service.priceTop ? `${service.priceBottom} - $${service.priceTop}` : service.priceTop}</p>
                        {"desc" in service && service.desc && <p className="bookOnlineServiceItemDesc">{service.desc}</p>}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div id="bookOnlineServicesService" className="bookOnlineServicesContainer">
            <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setServiceType(-1)}>Back</h2>
            <h2 id="bookOnlineServicesServiceHeader" className="bookOnlineServicesHeader">Select a Service</h2>
            <p className="bookOnlineServicesWarn">*PLEASE NOTE THAT SOME SERVICES MAY REQUIRE A CONSULTATION BEFORE BOOKING.*</p>
            {serviceList()}
        </div>
    );
}
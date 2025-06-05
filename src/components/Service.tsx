import ServiceTypeI from "../types/service";
import { BasketServiceI } from "../types/basket";

interface ServiceProps {
    setServiceTypeId: (id: number) => void;
    setService: (service: BasketServiceI) => void;
    serviceTypeId: number;
    serviceTypes: ServiceTypeI[];
}

export default function Service({ setServiceTypeId, setService, serviceTypeId, serviceTypes }: ServiceProps) {
    const serviceList = () => {
        return (
            <ul id="bookOnlineServiceList">
                {serviceTypes[serviceTypeId].services.map((service, index) => (
                    <li className="bookOnlineServiceItem" key={index} onClick={() => {
                        const selected = serviceTypes[serviceTypeId];
                        setService({
                            name: selected.name,
                            type: selected.services[index].type,
                            price: selected.services[index].priceBottom
                        });
                    }}>
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
            <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setServiceTypeId(-1)}>Back</h2>
            <h2 id="bookOnlineServicesServiceHeader" className="bookOnlineServicesHeader">Select a Service</h2>
            <p className="bookOnlineServicesWarn">*PLEASE NOTE THAT SOME SERVICES MAY REQUIRE A CONSULTATION BEFORE BOOKING.*</p>
            {serviceList()}
        </div>
    );
}
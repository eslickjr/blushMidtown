import { ServiceI } from "../types/service";
import { getServicesFirstTime } from "utils/api/blush/service";
import { useEffect } from "react";
import { useFirstTimeServices } from "context/BookingDataContext";

interface GuestProps {
    setBookType: (type: string) => void;
    setService: (serviceId: number) => void;
    setServiceType: (serviceTypeId: number) => void;
}

export default function Guest({ setBookType, setService, setServiceType }: GuestProps) {
    const { firstTimeServicesContext, setFirstTimeServicesContext } = useFirstTimeServices();

    useEffect(() => {
        const fetchFirstTimeServices = async () => {
            try {
                const services: ServiceI[] = await getServicesFirstTime();
                setFirstTimeServicesContext(services);
            } catch (error) {
                console.error("Error fetching first time services:", error);
            }
        };

        if (firstTimeServicesContext.length === 0) {
            fetchFirstTimeServices();
        }
    })

    const guestList = () => {
        return (
            <ul id="bookOnlineGuestList">
                {firstTimeServicesContext.map((service, index) => (
                    <li className="bookOnlineGuestItem" key={index} onClick={() => {setService(service.id); setServiceType(service.serviceTypeId)}}>
                        <h3 className="bookOnlineGuestItemHeader">{service.type}</h3>
                        <p className="bookOnlineGuestItemPrice">Price: ${service.priceBottom < service.priceTop ? `${service.priceBottom} - $${service.priceTop}` : service.priceTop}</p>
                        <p className="bookOnlineGuestItemDesc">{service.desc}</p>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div id="bookOnlineServicesGuest" className="bookOnlineServicesContainer">
            <h2 id="bookOnlineServicesGuestBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h2>
            <h2 id="bookOnlineServicesGuestHeader" className="bookOnlineServicesHeader">Select a Service</h2>
            <p className="bookOnlineServicesWarn">*PLEASE NOTE THAT SOME SERVICES MAY REQUIRE A CONSULTATION BEFORE BOOKING.*</p>
            {guestList()}
        </div>
    );
}
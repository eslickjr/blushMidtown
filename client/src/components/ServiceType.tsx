import { ServiceTypeI } from "../types/service";

interface ServiceTypeProps {
    setBookType: (type: string) => void;
    setServiceType: (id: number) => void;
    serviceTypes: ServiceTypeI[];
}

export default function ServiceType({ setBookType, setServiceType, serviceTypes }: ServiceTypeProps) {
    const serviceTypeList = () => {
        return (
            <ul id="bookOnlineServiceTypes">
                {serviceTypes.map((serviceType, index) => (
                    <li className="bookOnlineServiceTypeItem" key={index} onClick={() => {setServiceType(index)}}>
                        <h2 className="bookOnlineServiceTypeHeader">{serviceType.name}</h2>
                    </li>
                ))}
            </ul>
        );
    } 
    
    return (
        <div id="bookOnlineServicesType" className="bookOnlineServicesContainer">
            <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h2>
            <h2 id="bookOnlineServicesTypeHeader" className="bookOnlineServicesHeader">Select a Service Type</h2>
            {serviceTypeList()}
        </div>
    );
}
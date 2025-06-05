import GuestAppointmentI from "../types/guest";
import { BasketServiceI } from "types/basket";

interface GuestProps {
    setBookType: (type: string) => void;
    guestAppointments: GuestAppointmentI[];
    setService: (service: BasketServiceI) => void;
}

export default function Guest({ setBookType, guestAppointments, setService }: GuestProps) {
    const guestList = () => {
        return (
            <ul id="bookOnlineGuestList">
                {guestAppointments.map((appointment, index) => (
                    <li className="bookOnlineGuestItem" key={index} onClick={() => setService({ name: "First Time", type: appointment.type, price: appointment.priceBottom })}>
                        <h3 className="bookOnlineGuestItemHeader">{appointment.type}</h3>
                        <p className="bookOnlineGuestItemPrice">Price: ${appointment.priceBottom < appointment.priceTop ? `${appointment.priceBottom} - $${appointment.priceTop}` : appointment.priceTop}</p>
                        <p className="bookOnlineGuestItemDesc">{appointment.desc}</p>
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
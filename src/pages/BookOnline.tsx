import { useState } from "react";

import "../styles/BookOnline.css";

// Add this declaration to let TypeScript know about import.meta.glob
interface ImportMeta {
    glob: (pattern: string, options?: { eager?: boolean }) => Record<string, { default: string }>;
}
declare var importMeta: ImportMeta;

const staffImages = (import.meta as any).glob("../assets/staff/*.avif", { eager: true });

import eventData from "../utils/events.json";
import staffData from "../utils/staff.json";
import guestAppointments from "../utils/guest.json";
import additionalServices from "../utils/additional.json";
import serviceTypes from "../utils/serviceTypes.json";

export default function BookOnline() {
    const [signedIn, setSignedIn] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const [bookType, setBookType] = useState("");
    const [serviceTypeId, setServiceTypeId] = useState(-1);
    const [serviceId, setServiceId] = useState(-1);
    const [stylistId, setStylistId] = useState(-1);

    const stylistsData = staffData
        .filter(staff => staff.stylist)
        .map(staff => {
            if (!staff.stylist) return null;
            return {
                name: staff.name,
                src: staffImages[staff.src]?.default ?? ""
            };
        });

    const stylistList = () => {
        return (
            <ul id="bookOnlineStylistList">
                {stylistsData.map((stylist, index) => (
                    <li className="bookOnlineStylistItem" key={index} onClick={() => {setStylistId(index)}}>
                        <div className="bookOnlineStylistImageCon">
                            <img className="bookOnlineStylistImage" src={stylist?.src} alt={stylist?.name} />
                            <div className="bookOnlineStylistImageOverlay" />
                        </div>
                        <h2 className="bookOnlineStylistHeader">{stylist?.name}</h2>
                    </li>
                ))}
            </ul>
        );
    }

    const serviceTypeList = () => {
        return (
            <ul id="bookOnlineServiceTypes">
                {serviceTypes.map((serviceType, index) => (
                    <li className="bookOnlineServiceTypeItem" key={index} onClick={() => {setServiceTypeId(index)}}>
                        <h2 className="bookOnlineServiceTypeHeader">{serviceType.name}</h2>
                    </li>
                ))}
            </ul>
        );
    }

    const serviceList = () => {
        return (
            <ul id="bookOnlineServiceList">
                {serviceTypes[serviceTypeId].services.map((service, index) => (
                    <li className="bookOnlineServiceItem" key={index} onClick={() => {setServiceId(index)}}>
                        <h3 className="bookOnlineServiceItemHeader">{service.type}</h3>
                        <p className="bookOnlineServiceItemPrice">Price: ${service.priceBottom < service.priceTop ? `${service.priceBottom} - $${service.priceTop}` : service.priceTop}</p>
                        {"desc" in service && service.desc && <p className="bookOnlineServiceItemDesc">{service.desc}</p>}
                    </li>
                ))}
            </ul>
        );
    }

    const guestList = () => {
        return (
            <ul id="bookOnlineGuestList">
                {guestAppointments.map((appointment, index) => (
                    <li className="bookOnlineGuestItem" key={index}>
                        <h3 className="bookOnlineGuestItemHeader">{appointment.type}</h3>
                        <p className="bookOnlineGuestItemPrice">Price: ${appointment.priceBottom < appointment.priceTop ? `${appointment.priceBottom} - $${appointment.priceTop}` : appointment.priceTop}</p>
                        <p className="bookOnlineGuestItemDesc">{appointment.desc}</p>
                    </li>
                ))}
            </ul>
        );
    }

    const eventList = () => {
        return (
            <ul id="bookOnlineEventList">
                {eventData.map((event, index) => (
                    <li className="bookOnlineEventItem" key={index}>
                        <h3 className="bookOnlineEventItemHeader">{event.title}</h3>
                        <h4 className="bookOnlineEventItemTime">{new Date(event.start).toLocaleDateString()} ({new Date(event.start).toLocaleTimeString()} - {new Date(event.end).toLocaleTimeString()})</h4>
                        <p className="bookOnlineEventItemDesc">{event.description}</p>
                    </li>
                ))}
            </ul>
        );
    }


    return (
        <main id="bookOnline">
            <section id="bookOnlineWelcome" className="bookOnlineSection">
                <h1 id="bookOnlineWelcomeHeader">Welcome{signedIn ? (firstTime ? ` ${signedIn}!` : ` back ${signedIn}!`) : "!"}</h1>
                {!signedIn &&
                    <div id="bookOnlineWelcomeForm">
                        <form id="bookOnlineReturningForm" onSubmit={e => { e.preventDefault(); setFirstTime(false); setSignedIn("Returning Customer");}}>
                            <div id="bookOnlineReturningFormInputCon">
                                <h3 id="bookOnlineReturningFormHeader" className="bookOnlineFormHeader">Returning Client</h3>
                                <input className="bookOnlineFormInput" type="email" placeholder="Email" />
                                <input className="bookOnlineFormInput" type="password" placeholder="Password" />
                            </div>
                            <input className="bookOnlineFormButton" type="submit" value="Sign In" />
                        </form>
                        <form id="bookOnlineNewForm" onSubmit={e => { e.preventDefault(); setFirstTime(true); setSignedIn("New Customer");}}>
                            <h3 id="bookOnlineNewFormHeader" className="bookOnlineFormHeader">New Client</h3>
                            <input className="bookOnlineFormInput" type="text" placeholder="First Name" />
                            <input className="bookOnlineFormInput" type="text" placeholder="Last Name" />
                            <input className="bookOnlineFormInput" type="email" placeholder="Email" />
                            <input className="bookOnlineFormInput" type="tel" placeholder="Phone" />
                            <input className="bookOnlineFormInput" type="password" placeholder="Password" />
                            <input className="bookOnlineFormInput" type="password" placeholder="Confirm Password" />
                            <input className="bookOnlineFormButton" type="submit" value="Sign Up" />
                        </form>
                    </div>
                }
                <strong id="bookOnlineWelcomeNote">If you are having strouble booking online, please call the salon at (864) 263-7864 and we will be glad to assist you.</strong>
            </section>
            <section id="bookOnlineServices" className="bookOnlineSection">
                {!bookType ? (
                    <div id="bookOnlineServicesBookTypeCon">
                        <h2 id="bookOnlineServicesAppointment" className="bookOnlineServicesBookType" onClick={() => setBookType("appointment")}>Book an Appointment</h2>
                        or
                        <h2 id="bookOnlineServicesEvent" className="bookOnlineServicesBookType" onClick={() => setBookType("event")}>Attend an Event</h2>
                    </div>
                ) : (
                    bookType === "appointment" ? (
                        signedIn ? (
                            serviceTypeId === -1 ? (
                                <div id="bookOnlineServicesType" className="bookOnlineServicesContainer">
                                    <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h2>
                                    <h2 id="bookOnlineServicesTypeHeader" className="bookOnlineServicesHeader">Select a Service Type</h2>
                                    {serviceTypeList()}
                                </div>
                            ) : (
                                serviceId !== -1 ? (
                                    <div id="bookOnlineServicesStylist" className="bookOnlineServicesContainer">
                                        <h2 id="bookOnlineServicesStylistBack" className="bookOnlineServicesBack" onClick={() => setServiceId(-1)}>Back</h2>
                                        <h2 id="bookOnlineServicesStylistHeader" className="bookOnlineServicesHeader">Select a Stylist</h2>
                                        {stylistList()}
                                        <div className="bookOnlineStylistItem" key={stylistsData.length} onClick={() => {Math.floor(Math.random() * stylistsData.length)}}>
                                            <div className="bookOnlineStylistImageCon">
                                                <div id="bookOnlineRandomStylist" className="bookOnlineStylistImage">?</div>
                                                <div className="bookOnlineStylistImageOverlay" />
                                            </div>
                                            <h2 className="bookOnlineStylistHeader">Random</h2>
                                        </div>
                                    </div>
                                ) : (
                                    <div id="bookOnlineServicesService" className="bookOnlineServicesContainer">
                                        <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setServiceTypeId(-1)}>Back</h2>
                                        <h2 id="bookOnlineServicesServiceHeader" className="bookOnlineServicesHeader">Select a Service</h2>
                                        <p className="bookOnlineServicesWarn">*PLEASE NOTE THAT SOME SERVICES MAY REQUIRE A CONSULTATION BEFORE BOOKING.*</p>
                                        {serviceList()}
                                    </div>
                                )
                            )
                        ) : (
                            <div id="bookOnlineServicesGuest" className="bookOnlineServicesContainer">
                                <h2 id="bookOnlineServicesGuestBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h2>
                                <h2 id="bookOnlineServicesGuestHeader" className="bookOnlineServicesHeader">Select a Service</h2>
                                <p className="bookOnlineServicesWarn">*PLEASE NOTE THAT SOME SERVICES MAY REQUIRE A CONSULTATION BEFORE BOOKING.*</p>
                                {guestList()}
                            </div>
                        )
                    ) : (
                        <div id="bookOnlineServicesEventForm">
                            <h2 id="bookOnlineServicesServiceBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h2>
                            <h2 className="bookOnlineServicesHeader">Select an Event</h2>
                            {eventList()}
                        </div>
                    )
                )}
            </section>
        </main>
    );
}
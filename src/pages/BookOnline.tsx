import { useEffect, useState } from "react";

import "../styles/BookOnline.css";

// Add this declaration to let TypeScript know about import.meta.glob
interface ImportMeta {
    glob: (pattern: string, options?: { eager?: boolean }) => Record<string, { default: string }>;
}
declare var importMeta: ImportMeta;

const staffImages = (import.meta as any).glob("../assets/staff/*.avif", { eager: true });

import eventData from "../utils/json/events.json";
import staffData from "../utils/json/staff.json";
import guestAppointments from "../utils/json/guest.json";
import additionalServices from "../utils/json/additional.json";
import serviceTypes from "../utils/json/serviceTypes.json";

import Calendar from "../components/Calendar";
import Checkout from "../components/Checkout";
import ServiceType from "../components/ServiceType";
import ServiceComp from "../components/Service";
import Guest from "../components/Guest";
import AdditionalService from "../components/AdditionalService";
import Stylist from "../components/Stylist";
import UserArea from "../components/UserArea";

import BasketI, { BasketServiceI, BasketAddServiceI, BasketStylistI } from "../types/basket";

export default function BookOnline() {
    const [signedIn, setSignedIn] = useState<string>("");
    const [firstTime, setFirstTime] = useState<boolean>(true);
    const [bookType, setBookType] = useState<string>("");
    const [serviceTypeId, setServiceTypeId] = useState<number>(-1);
    const [addService, setAddService] = useState<BasketAddServiceI[]>([]);
    const [addServicePass, setAddServicePass] = useState<boolean>(false);
    const defaultService={ name: "", type: "", price: -1}
    const [service, setService] = useState<BasketServiceI>(defaultService);
    const defaultStylist: BasketStylistI = { name: "", src: "" };
    const [stylist, setStylist] = useState<BasketStylistI>(defaultStylist);
    const [clientNav, setClientNav] = useState<string>("Appointments");
    const [basket, setBasket] = useState<BasketI>({
        service: service,
        addServices: [],
        stylist: stylist,
        date: undefined,
        timeEnd: undefined,
        note: "",
    });
    const [serviceDate, setServiceDate] = useState<Date | undefined>();

    const rebook = {
        setBookType: setBookType,
        setServiceTypeId: setServiceTypeId,
        setAddService: setAddService,
        setAddServicePass: setAddServicePass,
        setService: setService,
        setStylist: setStylist
    }

    useEffect(() => {
        setBasket({
            service: service,
            addServices: addService,
            stylist: stylist,
            date: serviceDate,
            timeEnd: "11:00",
            note: "",
        });
    }
    , [serviceTypeId, service, stylist, serviceDate]);


    const stylistsData: BasketStylistI[] = staffData
        .filter(staff => staff.stylist)
        .map(staff => {
            return {
                name: staff.name,
                src: staffImages[staff.src]?.default ?? ""
            };
        });

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
            <UserArea signedIn={signedIn} setSignedIn={setSignedIn} firstTime={firstTime} setFirstTime={setFirstTime} stylistData={stylistsData} bookType={bookType} clientNav={clientNav} setClientNav={setClientNav} rebook={rebook} serviceTypes={serviceTypes} />
            <section id="bookOnlineServices" className="bookOnlineSection">
                {!bookType ? (
                    <div id="bookOnlineServicesBookTypeCon">
                        <h2 id="bookOnlineServicesAppointment" className="bookOnlineServicesBookType" onClick={() => {setBookType("appointment"); setClientNav("");}}>Book an Appointment</h2>
                        or
                        <h2 id="bookOnlineServicesEvent" className="bookOnlineServicesBookType" onClick={() => {setBookType("event"); setClientNav("");}}>Attend an Event</h2>
                    </div>
                ) : (
                    bookType === "appointment" ? (
                        signedIn ? (
                            serviceTypeId === -1 ? (
                                <ServiceType serviceTypes={serviceTypes} setBookType={setBookType} setServiceTypeId={setServiceTypeId} />
                            ) : (
                                service.name ? (
                                    addServicePass ? (
                                        !stylist.name ? (
                                            <Stylist setAddServicePass={setAddServicePass} setStylist={setStylist} stylistsData={stylistsData} />
                                        ) : (
                                            serviceDate === undefined ? (
                                                <Calendar setStylist={setStylist} setServiceDate={setServiceDate} stylistName={stylist.name} defaultStylist={defaultStylist}/>
                                            ) : (
                                                <Checkout setServiceDate={setServiceDate} basket={basket}  />
                                            )
                                        )
                                    ) : (
                                        <AdditionalService additionalServices={additionalServices} addService={addService} setAddService={setAddService} setService={setService} service={service} defaultService={defaultService} setAddServicePass={setAddServicePass} />
                                    )
                                ) : (
                                    <ServiceComp setService={setService} setServiceTypeId={setServiceTypeId} serviceTypeId={serviceTypeId} serviceTypes={serviceTypes} />
                                )
                            )
                        ) : (
                            service.type ? (
                                addServicePass ? (
                                    !stylist.name ? (
                                        <Stylist setAddServicePass={setAddServicePass} setStylist={setStylist} stylistsData={stylistsData} />
                                    ) : (
                                        serviceDate === undefined ? (
                                            <Calendar setStylist={setStylist} setServiceDate={setServiceDate} stylistName={stylist.name} defaultStylist={defaultStylist}/>
                                        ) : (
                                            <Checkout setServiceDate={setServiceDate} basket={basket} />
                                        )
                                    )
                                ) : (
                                    <AdditionalService additionalServices={additionalServices} addService={addService} setAddService={setAddService} setService={setService} service={service} defaultService={defaultService} setAddServicePass={setAddServicePass} />
                                )
                            ) : (
                                <Guest setBookType={setBookType} guestAppointments={guestAppointments} setService={setService} />
                            )
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
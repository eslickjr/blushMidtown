import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Import styles
import "../styles/BookOnline.css";

// Add this declaration to let TypeScript know about import.meta.glob
interface ImportMeta {
    glob: (pattern: string, options?: { eager?: boolean }) => Record<string, { default: string }>;
}
declare var importMeta: ImportMeta;

const staffImages = (import.meta as any).glob("../assets/staff/*.avif", { eager: true });

//////////////////////
// API Imports      //
//////////////////////
import { getAllStylists } from "../utils/api/blush/stylist";
import { getAllServiceTypes } from "utils/api/blush/serviceType";
import { getAddServices } from "utils/api/blush/addService";
import eventData from "../utils/json/events.json";
import staffData from "../utils/json/staff.json";
// import guestAppointments from "../utils/json/guest.json";
// import additionalServices from "../utils/json/additional.json";
// import serviceTypes from "../utils/json/serviceTypes.json";
import { useStylists, useServiceTypes, useAddServices, useServices } from "../context/BookingDataContext";

//////////////////////
// Component Imports//
//////////////////////
import Calendar from "../components/Calendar";
import Checkout from "../components/Checkout";
import ServiceType from "../components/ServiceType";
import ServiceComp from "../components/Service";
import Guest from "../components/Guest";
import AdditionalService from "../components/AdditionalService";
import Stylist from "../components/Stylist";
import UserArea from "../components/UserArea";

//////////////////////
// Type Imports     //
//////////////////////
import AppointmentI from "types/appointment";
import StylistI from "types/stylist";
import ClientI from "types/client";

type ContextType = {
    client: ClientI | null;
    setClient: (client: ClientI | null) => void;
    clientNav: string;
    setClientNav: (clientNav: string) => void;
    handleClientNav: (navItem: string) => void;
    bloomOut: () => void;
}

export default function BookOnline() {
    const { client, setClient, clientNav, setClientNav } = useOutletContext<ContextType>();
    const [firstTime, setFirstTime] = useState<boolean>(true);
    const [bookType, setBookType] = useState<string>("");
    const [addService, setAddService] = useState<number[]>([]);
    const [addServicePass, setAddServicePass] = useState<boolean>(false);
    const [service, setService] = useState<number>(-1);
    const [serviceType, setServiceType] = useState<number>(-1);
    const [stylist, setStylist] = useState<number>(-1);
    const [appointment, setAppointment] = useState<AppointmentI>({
        clientId: -1,
        serviceId: service,
        serviceTypeId: serviceType,
        addServiceIds: addService,
        stylistId: stylist,
        startTime: new Date(),
        endTime: new Date()
    });
    const [serviceDate, setServiceDate] = useState<Date | undefined>();
    const { stylistsContext, setStylistsContext } = useStylists();
    const { serviceTypesContext, setServiceTypesContext } = useServiceTypes();
    const { addServicesContext, setAddServicesContext } = useAddServices();
    const { servicesContext } = useServices();
    const [ serviceDuration , setServiceDuration ] = useState<number>(0);

    const rebook = {
        setBookType: setBookType,
        setServiceType: setServiceType,
        setAddService: setAddService,
        setAddServicePass: setAddServicePass,
        setService: setService,
        setStylist: setStylist
    }

    const postBook = {
        setBookType: setBookType,
        setServiceType: setServiceType,
        setAddService: setAddService,
        setAddServicePass: setAddServicePass,
        setService: setService,
        setStylist: setStylist,
        setServiceDate: setServiceDate,
        setAppointment: setAppointment
    }

    useEffect(() => {
        if ( service !== -1 ) {
            const serviceInfo = servicesContext.find(s => s.id === service);
            if (serviceInfo) {
                setServiceDuration(serviceInfo.duration);
            } else {
                setServiceDuration(0);
            }
        } else {
            setServiceDuration(0);
        }
    }, [service, servicesContext]);

    useEffect(() => {
        const updateStylists = async () => {
            const stylistsInfo = await getAllStylists();
            setStylistsContext(stylistsInfo);
        }

        const updateServiceTypes = async () => {
            const serviceTypesInfo = await getAllServiceTypes();
            setServiceTypesContext(serviceTypesInfo);
        }

        const updateAddServices = async () => {
            const addServicesInfo = await getAddServices();
            setAddServicesContext(addServicesInfo);
        }

        if (stylistsContext.length === 0) updateStylists();
        if (serviceTypesContext.length === 0) updateServiceTypes();
        if (addServicesContext.length === 0) updateAddServices();
    }, []);

    useEffect(() => {
        setAppointment({
            clientId: client?.id ?? -1,
            serviceId: service,
            serviceTypeId: serviceType,
            addServiceIds: addService,
            stylistId: stylist,
            startTime: serviceDate ? new Date(serviceDate) : new Date(),
            endTime: serviceDate ? new Date(new Date(serviceDate).getTime() + serviceDuration * 60000) : new Date(new Date().getTime() + serviceDuration * 60000),
        });
    }
    , [serviceType, service, stylist, serviceDate]);


    const stylistsData: StylistI[] = staffData
        .filter(staff => staff.stylist)
        .map((staff, index) => {
            return {
                id: index,
                name: staff.name,
                src: staffImages[staff.src]?.default ?? "",
                pricingLevelId: staff.pricingLevelId ?? 1,
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
            <Helmet>
                <title>Book Your Appointment Online | Blush Midtown Greenville</title>
                <meta name="description" content="Easily book your hair salon appointment online at Blush Midtown in Greenville. Fast, simple scheduling for all services." />
            </Helmet>
            <UserArea client={client} setClient={setClient} firstTime={firstTime} setFirstTime={setFirstTime} stylistData={stylistsData} bookType={bookType} clientNav={clientNav} setClientNav={setClientNav} rebook={rebook} serviceTypes={serviceTypesContext} />
            <section id="bookOnlineServices" className={`bookOnlineSection ${client && !clientNav ? "bookOnlineServicesSignedIn" : ""}`}>
                {!bookType ? (
                    <div id="bookOnlineServicesBookTypeCon">
                        <h2 id="bookOnlineServicesAppointment" className="bookOnlineServicesBookType" onClick={() => {setBookType("appointment"); setClientNav("");}}>Book an Appointment</h2>
                        or
                        <h2 id="bookOnlineServicesEvent" className="bookOnlineServicesBookType" onClick={() => {setBookType("event"); setClientNav("");}}>Attend an Event</h2>
                    </div>
                ) : (
                    bookType === "appointment" ? (
                        client ? (
                            serviceType === -1 ? (
                                <ServiceType serviceTypes={serviceTypesContext} setBookType={setBookType} setServiceType={setServiceType} />
                            ) : (
                                service !== -1 ? (
                                    addServicePass ? (
                                        stylist === -1 ? (
                                            <Stylist setAddServicePass={setAddServicePass} setStylist={setStylist} stylistsData={stylistsData} serviceDuration={serviceDuration}/>
                                        ) : (
                                            serviceDate === undefined ? (
                                                <Calendar setStylist={setStylist} setServiceDate={setServiceDate} stylist={stylist} serviceDuration={serviceDuration}/>
                                            ) : (
                                                <Checkout setServiceDate={setServiceDate} appointment={appointment} postBook={postBook} />
                                            )
                                        )
                                    ) : (
                                        <AdditionalService additionalServices={addServicesContext} addService={addService} setAddService={setAddService} setService={setService} service={service} setAddServicePass={setAddServicePass} />
                                    )
                                ) : (
                                    <ServiceComp setService={setService} setServiceType={setServiceType} serviceType={serviceType} />
                                )
                            )
                        ) : (
                            service ? (
                                addServicePass ? (
                                    !stylist ? (
                                        <Stylist setAddServicePass={setAddServicePass} setStylist={setStylist} stylistsData={stylistsData} serviceDuration={serviceDuration}/>
                                    ) : (
                                        serviceDate === undefined ? (
                                            <Calendar setStylist={setStylist} setServiceDate={setServiceDate} stylist={stylist} serviceDuration={serviceDuration}/>
                                        ) : (
                                            <Checkout setServiceDate={setServiceDate} appointment={appointment} postBook={postBook} />
                                        )
                                    )
                                ) : (
                                    <AdditionalService additionalServices={addServicesContext} addService={addService} setAddService={setAddService} setService={setService} service={service} setAddServicePass={setAddServicePass} />
                                )
                            ) : (
                                <Guest setBookType={setBookType} setService={setService} setServiceType={setServiceType} />
                            )
                        )
                    ) : bookType === "booked" ? (
                        <div id="bookOnlineServicesBooked">
                            <h2 id="bookOnlineServicesBookedHeader">Your Appointment is Booked!</h2>
                            <h3 id="bookOnlineServicesBookedSubHeader">We will see you soon!</h3>
                            <h4 id="bookOnlineServicesBookedBack" className="bookOnlineServicesBack" onClick={() => setBookType("")}>Back</h4>
                        </div>
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
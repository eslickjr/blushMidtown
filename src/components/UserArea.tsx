import { useEffect, useState } from "react";
import AddCardModal from "./AddCardModal";
import DeleteCardModal from "./DeleteCardModal";

import { BasketStylistI, BasketAddServiceI, BasketServiceI } from "types/basket";
import ServiceTypeI from "../types/service";

import "../styles/UserArea.css";
import UpdateCardModal from "./UpdateCardModal";

interface UserAreaProps {
    signedIn: string;
    setSignedIn: (signedIn: string) => void;
    firstTime: boolean;
    setFirstTime: (firstTime: boolean) => void;
    stylistData: BasketStylistI[];
    bookType: string;
    clientNav: string;
    setClientNav: (clientNav: string) => void;
    rebook: {
        setBookType: (bookType: string) => void;
        setServiceTypeId: (serviceTypeId: number) => void;
        setAddService: (addService: BasketAddServiceI[]) => void;
        setAddServicePass: (addServicePass: boolean) => void;
        setService: (service: BasketServiceI) => void;
        setStylist: (stylist: BasketStylistI) => void;
    };
    serviceTypes: ServiceTypeI[];
}

interface CardI {
    cardNumber: string;
    cardType: string;
    expiryDate: string;
    zipCode: string;
    isPrimary: boolean;
}

interface AppointmentI {
    name: string;
    type: string;
    addServices: BasketAddServiceI[];
    stylist: BasketStylistI;
    date: string;
}

const placeholderStylist = [
    {
        name: "Courtney",
        src: "../assets/staff/Courtney.avif"
    },
    {
        name: "Jen",
        src: "../assets/staff/Jen.avif"
    }
]

const placeholderAddService = [
    {
        type: "Deep Conditioning Treatment",
        price: 25
    }, {
        type: "Brow Wax & Tint",
        price: 30
    }
];

const placeholderAppointment = [
    {
        name: "Color",
        type: "Balayage | Lived in Color",
        addServices: placeholderAddService,
        stylist: placeholderStylist[0],
        date: "2025-10-01T10:00:00-04:00"
    },
    {
        name: "Color",
        type: "Color Retouch",
        addServices: [],
        stylist: placeholderStylist[0],
        date: "2024-10-15T10:00:00-04:00"
    },
    {
        name: "Haircut",
        type: "Bang Trim",
        addServices: [placeholderAddService[0]],
        stylist: placeholderStylist[1],
        date: "2024-07-20T10:00:00-04:00"
    }
]

const cardPlaceholder = [
    {
        cardNumber: "2345 3452 4345 1234",
        cardType: "Visa",
        expiryDate: "12/25",
        zipCode: "12345",
        isPrimary: true,
    },
    {
        cardNumber: "5436 3456 3456 5678",
        cardType: "MasterCard",
        expiryDate: "11/28",
        zipCode: "67890",
        isPrimary: false,
    }
]
    


const placeholderClient = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@gmail.com",
    phone: ["(864) 123-4567"],
    birthday: new Date("1990-01-01"),
    emailOptIn: true,
    cards: cardPlaceholder,
}

export default function UserArea({ signedIn, setSignedIn, firstTime, setFirstTime, stylistData, bookType, clientNav, setClientNav, rebook, serviceTypes }: UserAreaProps) {
    placeholderAppointment.forEach((appointment) => {
        appointment.stylist = stylistData.find(stylist => stylist.name === appointment.stylist.name) || appointment.stylist;
    });
    
    const [upcomingAppointment, setUpcomingAppointment] = useState<any>(placeholderAppointment[0]);
    const [previousAppointments, setPreviousAppointments] = useState<any[]>([placeholderAppointment[0], placeholderAppointment[1], placeholderAppointment[2]]);
    const [client, setClient] = useState<any>(placeholderClient);
    const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState<boolean>(false);
    const [updateCardModalOpen, setUpdateCardModalOpen] = useState<boolean>(false);
    const [cardToUpdate, setCardToUpdate] = useState<CardI>({cardNumber: "",  cardType: "", expiryDate: "", zipCode: "", isPrimary: false,});

    useEffect(() => {
        setUpcomingAppointment(placeholderAppointment[0]);
        setPreviousAppointments([placeholderAppointment[0], placeholderAppointment[1], placeholderAppointment[2]]);
        setClient(placeholderClient);
    }, []);

    const handleClientNav = (navItem: string) => {
        if (clientNav === navItem) {
            setClientNav("");
        } else {
            setClientNav(navItem);
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        let formattedValue = "";

        if (value.length > 0) {
            formattedValue = "(" + value.substring(0, 3);
        }
        if (value.length >= 4) {
            formattedValue += ") " + value.substring(3, 6);
        }
        if (value.length >= 7) {
            formattedValue += "-" + value.substring(6, 10);
        }

        e.target.value = formattedValue;
    }

    interface OnDeleteFn {
        (cardToDelete: CardI): void;
    }

    const onDelete: OnDeleteFn = (cardToDelete) => {
        setClient((prevClient: typeof placeholderClient) => ({
            ...prevClient,
            cards: prevClient.cards.filter((card: CardI) => card.cardNumber !== cardToDelete.cardNumber)
        }));
    };

    const getMaskedCard = (input: string) => {
        input = input.replace(/\D/g, ''); // Remove non-digit characters
        input = input.replace(/\d(?=\d{4})/g, '*');
        let formattedInput = '';

        for (let i = 0; i < input.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedInput += ' '; // Add space every 4 digits
            }
            formattedInput += input[i];
        }

        if (formattedInput.length > 19) {
            formattedInput = formattedInput.slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
        }

        return formattedInput;
    }

    const handleRebook = (appointment: AppointmentI) => {
        rebook.setBookType("appointment");
        rebook.setStylist(appointment.stylist);
        const tempServiceTypeId = serviceTypes.findIndex((serviceType: ServiceTypeI) => serviceType.name === appointment.name);
        console.log("tempServiceTypeId", tempServiceTypeId);
        rebook.setServiceTypeId(tempServiceTypeId);
        rebook.setAddServicePass(true);
        const tempService = serviceTypes[tempServiceTypeId].services.find((service: ServiceTypeI["services"][number]) => service.type === appointment.type);
        if (tempService) {
            rebook.setService({ name: appointment.name, type: appointment.type, price: tempService?.priceBottom });
        }
        setClientNav("");
        rebook.setAddService(appointment.addServices);
    }

    return (
        <section id="bookOnlineWelcome" className="bookOnlineSection">
            {signedIn && 
                <div id="clientNavBar">
                    <p className={`clientNavItem ${clientNav === "Profile" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Profile")}>Profile</p>
                    <p className={`clientNavItem ${clientNav === "Appointments" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Appointments")}>Appointments</p>
                    <p className={`clientNavItem ${clientNav === "Payment Methods" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Payment Methods")}>Payment Methods</p>
                    <p className="clientNavItem clientNavItemInactive" onClick={() => setSignedIn("")}>Logout</p>
                </div>
            }
            {clientNav === "Appointments" && !bookType &&<h1 id="bookOnlineWelcomeHeader">Welcome{signedIn ? (firstTime ? ` ${client.firstName}!` : ` back ${client.firstName}!`) : "!"}</h1>}
            {!signedIn ?
                <div id="bookOnlineWelcomeForm">
                    <form id="bookOnlineReturningForm" onSubmit={e => { e.preventDefault(); setFirstTime(false); setSignedIn("Returning Customer");setClientNav("Appointments");}}>
                        <div id="bookOnlineReturningFormInputCon">
                            <h3 id="bookOnlineReturningFormHeader" className="bookOnlineFormHeader">Returning Client</h3>
                            <input className="bookOnlineFormInput" type="email" placeholder="Email" />
                            <input className="bookOnlineFormInput" type="password" placeholder="Password" />
                        </div>
                        <input className="bookOnlineFormButton" type="submit" value="Sign In" />
                    </form>
                    <form id="bookOnlineNewForm" onSubmit={e => { e.preventDefault(); setFirstTime(true); setSignedIn("New Customer");setClientNav("Appointments");}}>
                        <h3 id="bookOnlineNewFormHeader" className="bookOnlineFormHeader">New Client</h3>
                        <input className="bookOnlineFormInput" type="text" placeholder="First Name" onChange={(e) => handleTextChange(e)} />
                        <input className="bookOnlineFormInput" type="text" placeholder="Last Name" onChange={(e) => handleTextChange(e)} />
                        <input className="bookOnlineFormInput" type="email" placeholder="Email" />
                        <input className="bookOnlineFormInput" type="tel" placeholder="Phone" onChange={(e) => handlePhoneChange(e)} />
                        <input className="bookOnlineFormInput" type="password" placeholder="Password" />
                        <input className="bookOnlineFormInput" type="password" placeholder="Confirm Password" />
                        <div id="emailOptInContainer">
                            <div id="emailOptInCheckboxContainer">
                                <input type="checkbox" id="emailOptInCheckbox" name="emailOptInCheckbox" />
                                <svg id="emailOptInCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                </svg>
                            </div>
                            <label htmlFor="emailOptInCheckbox" id="emailOptInLabel">I would like to receive emails about specials, events, and promotions.</label>
                        </div>
                        <input className="bookOnlineFormButton" type="submit" value="Sign Up" />
                    </form>
                </div>
            :
                (
                    <>
                        {clientNav === "Appointments" && (
                            <div id="bookOnlineAppointments">
                                {upcomingAppointment && 
                                    <div id="bookOnlineUpcomingAppointmentContainer">
                                        <h3 id="bookOnlineUpcomingAppointmentHeader" className="bookOnlineFormHeader">Upcoming Appointment</h3>
                                        <div id="bookOnlineUpcomingAppointment" className="bookOnlineAppointmentItem">
                                            <div className="bookOnlineAppointmentItemInfo">
                                                <p className="bookOnlineAppointmentName">{upcomingAppointment.name} on</p>
                                                <p className="bookOnlineAppointmentDate">{new Date(upcomingAppointment.date).toLocaleDateString("en-US", { day: "numeric", year: "numeric", month: "long" })}</p>
                                                <p className="bookOnlineAppointmentDate">at {new Date(upcomingAppointment.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</p>
                                            </div>
                                            <p className="bookOnlineAppointmentWith">with</p>
                                            <div className="bookOnlineAppointmentStylistContainer">
                                                <img className="bookOnlineAppointmentStylist" src={upcomingAppointment.stylist.src} alt={upcomingAppointment.stylist.name} />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {previousAppointments.length > 0 && 
                                    <div id="bookOnlinePreviousAppointmentsContainer">
                                        <h3 id="bookOnlinePreviousAppointmentsHeader" className="bookOnlineFormHeader">Previous Appointments</h3>
                                        <h4 id="bookOnlinePreviousAppointmentsSubHeader" className="bookOnlineFormSubHeader">Click to rebook!</h4>
                                        <ul id="bookOnlinePreviousAppointmentsList">
                                            {previousAppointments.map((appointment, index) => (
                                                <li key={index} className="bookOnlineAppointmentItem bookOnlinePreviousAppointmentItem" onClick={() => handleRebook(appointment)}>
                                                    <div className="bookOnlineAppointmentItemInfo">
                                                        <p className="bookOnlineAppointmentName">{appointment.name} on</p>
                                                        <p className="bookOnlineAppointmentDate">{new Date(appointment.date).toLocaleDateString("en-us", { day: "numeric", year: "numeric", month: "long" })}</p>
                                                    </div>
                                                    <p className="bookOnlineAppointmentWith">with</p>
                                                    <div className="bookOnlineAppointmentStylistContainer">
                                                        <img className="bookOnlineAppointmentStylist" src={appointment.stylist.src} alt={appointment.stylist.name} />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        )}
                        {clientNav === "Profile" && (
                            <form id="bookOnlineNewForm" onSubmit={e => { e.preventDefault(); setFirstTime(true); setSignedIn("New Customer");}}>
                                <h3 id="bookOnlineNewFormHeader" className="bookOnlineFormHeader">Your Info</h3>
                                <div className="bookOnlineFormInputContainer">
                                    <label htmlFor="bookOnlineFirstName" className="bookOnlineFormLabel">First Name</label>
                                    <input className="bookOnlineFormInput" name="bookOnlineFirstName" type="text" placeholder={client.firstName} onChange={(e) => handleTextChange(e)} />
                                    <label htmlFor="bookOnlineLastName" className="bookOnlineFormLabel">Last Name</label>
                                    <input className="bookOnlineFormInput" name="bookOnlineLastName" type="text" placeholder={client.lastName} onChange={(e) => handleTextChange(e)} />
                                    <label htmlFor="bookOnlineEmail" className="bookOnlineFormLabel">E-Mail</label>
                                    <input className="bookOnlineFormInput" name="bookOnlineEmail" type="email" placeholder={client.email} />
                                    <label htmlFor="bookOnlinePhone" className="bookOnlineFormLabel">Phone</label>
                                    <input className="bookOnlineFormInput" name="bookOnlinePhone" type="tel" placeholder={client.phone} onChange={(e) => handlePhoneChange(e)} />
                                    <div/>
                                    <input className="bookOnlineFormInput" type="password" placeholder="New Password" />
                                    <div/>
                                    <input className="bookOnlineFormInput" type="password" placeholder="Confirm New Password" />
                                    <div/>
                                    <div id="emailOptInContainer">
                                        <div id="emailOptInCheckboxContainer">
                                            <input type="checkbox" checked={client.emailOptIn} id="emailOptInCheckbox" name="emailOptInCheckbox" />
                                            <svg id="emailOptInCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                            </svg>
                                        </div>
                                        <label htmlFor="emailOptInCheckbox" id="emailOptInLabel">I would like to receive emails about specials, events, and promotions.</label>
                                    </div>
                                </div>
                                <input className="bookOnlineFormButton" type="submit" value="Update" />
                            </form>
                        )}
                        {clientNav === "Payment Methods" && (
                            <div id="bookOnlinePaymentMethods">
                                <h3 id="bookOnlinePaymentMethodsHeader" className="bookOnlineFormHeader">Payment Methods</h3>
                                <ul id="bookOnlinePaymentMethodsList">
                                    {client.cards.map((card: any, index: number) => (
                                        <li key={index} className="bookOnlinePaymentMethodItemContainer">
                                            <div className={`bookOnlinePaymentMethodItem ${card.isPrimary ? "bookOnlinePaymentMethodPrimary" : ""}`} onClick={() => {setCardToUpdate(card); setUpdateCardModalOpen(true);}}>
                                                { card.isPrimary && <p className="bookOnlinePaymentMethodPrimaryText">Primary</p> }
                                                <p className="bookOnlinePaymentMethodCardType bookOnlinePaymentMethodText">{card.cardType}</p>
                                                <p className="bookOnlinePaymentMethodCardNumber  bookOnlinePaymentMethodText">{getMaskedCard(card.cardNumber)}</p>
                                                <p className="bookOnlinePaymentMethodZipCode  bookOnlinePaymentMethodText">{card.zipCode}</p>
                                                <p className="bookOnlinePaymentMethodExpirationDate  bookOnlinePaymentMethodText">Expires: {card.expiryDate}</p>
                                            </div>
                                            <svg className="bookOnlinePaymentMethodRemove" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={(e) => {e.stopPropagation(); setCardToUpdate(card); setDeleteCardModalOpen(true);}}>
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                                <input className="bookOnlineFormButton" type="button" value="Add Card" onClick={() => setAddCardModalOpen(true)}/>
                            </div>
                        )}
                    </>
                )
            }
            {clientNav === "Appointments" && !bookType && <strong id="bookOnlineWelcomeNote">If you are having strouble booking online, please call the salon at (864) 263-7864 and we will be glad to assist you.</strong>}
            <AddCardModal addCardModalOpen={addCardModalOpen} setAddCardModalOpen={setAddCardModalOpen} setClient={setClient} />
            <DeleteCardModal deleteCardModalOpen={deleteCardModalOpen} setDeleteCardModalOpen={setDeleteCardModalOpen} onDelete={() => onDelete(cardToUpdate)} />
            <UpdateCardModal updateCardModalOpen={updateCardModalOpen} setUpdateCardModalOpen={setUpdateCardModalOpen} cardToUpdate={cardToUpdate} setClient={setClient} />
        </section>
    );
}
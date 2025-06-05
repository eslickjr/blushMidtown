import { useEffect, useState } from "react";

import { BasketStylistI } from "types/basket";

import "../styles/UserArea.css";

interface UserAreaProps {
    signedIn: string;
    setSignedIn: (signedIn: string) => void;
    firstTime: boolean;
    setFirstTime: (firstTime: boolean) => void;
    stylistData: BasketStylistI[];
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

const placeholderAppointment = [
    {
        name: "Color",
        type: "Balayage | Lived in Color",
        stylist: placeholderStylist[0],
        date: "2025-10-01T10:00:00-04:00"
    },
    {
        name: "Color",
        type: "Color Retouch",
        stylist: placeholderStylist[0],
        date: "2024-10-15T10:00:00-04:00"
    },
    {
        name: "Haircuts",
        type: "Bang Trim",
        stylist: placeholderStylist[1],
        date: "2024-07-20T10:00:00-04:00"
    }
]

const cardPlaceholder = [
    {
        cardNumber: "**** **** **** 1234",
        cardType: "Visa",
        expirationDate: "12/25",
    },
    {
        cardNumber: "**** **** **** 5678",
        cardType: "MasterCard",
        expirationDate: "11/28",
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

export default function UserArea({ signedIn, setSignedIn, firstTime, setFirstTime, stylistData }: UserAreaProps) {
    placeholderAppointment.forEach((appointment) => {
        appointment.stylist = stylistData.find(stylist => stylist.name === appointment.stylist.name) || appointment.stylist;
    });
    
    const [upcomingAppointment, setUpcomingAppointment] = useState<any>(placeholderAppointment[0]);
    const [previousAppointments, setPreviousAppointments] = useState<any[]>([placeholderAppointment[1], placeholderAppointment[2]]);
    const [client, setClient] = useState<any>(placeholderClient);
    const [clientNav, setClientNav] = useState<string>("Appointments");

    useEffect(() => {
        setUpcomingAppointment(placeholderAppointment[0]);
        setPreviousAppointments([placeholderAppointment[1], placeholderAppointment[2]]);
        setClient(placeholderClient);
    }, []);

    const handleClientNav = (navItem: string) => {
        if (clientNav === navItem) {
            clientNav === "";
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
    
    return (
        <section id="bookOnlineWelcome" className="bookOnlineSection">
            {signedIn && 
                <div id="clientNavBar">
                    <p className={`clientNavItem ${clientNav === "Profile" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Profile")}>Profile</p>
                    <p className={`clientNavItem ${clientNav === "Appointments" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Appointments")}>Appointments</p>
                    <p className={`clientNavItem ${clientNav === "Payment Methods" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Payment Methods")}>Payment Methods</p>
                    <p className="clientNavItem clientNavItemInactive" >Logout</p>
                </div>
            }
            <h1 id="bookOnlineWelcomeHeader">Welcome{signedIn ? (firstTime ? ` ${client.firstName}!` : ` back ${client.firstName}!`) : "!"}</h1>
            {!signedIn ?
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
                <div id="bookOnlineAppointments">
                    {upcomingAppointment && 
                        <div id="bookOnlineUpcomingAppointmentContainer">
                            <h3 id="bookOnlineUpcomingAppointmentHeader" className="bookOnlineFormHeader">Upcoming Appointment</h3>
                            <div id="bookOnlineUpcomingAppointment" className="bookOnlineAppointmentItem">
                                <div className="bookOnlineAppointmentItemInfo">
                                    <p className="bookOnlineAppointmentName">{upcomingAppointment.name} on</p>
                                    <p className="bookOnlineAppointmentDate">{new Date(upcomingAppointment.date).toLocaleDateString("en-US", { day: "numeric", year: "numeric", month: "long" })}</p>
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
                                    <li key={index} className="bookOnlineAppointmentItem bookOnlinePreviousAppointmentItem">
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
            }
            <strong id="bookOnlineWelcomeNote">If you are having strouble booking online, please call the salon at (864) 263-7864 and we will be glad to assist you.</strong>
        </section>
    );
}
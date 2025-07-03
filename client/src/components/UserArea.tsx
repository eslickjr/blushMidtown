import { useEffect, useState } from "react";
import validator from "validator";
import { createClient, loginClient, updateClient } from "../utils/api/blush/client";
import { createPaymentCard, getPaymentCardsByClientId, updatePaymentCard, deletePaymentCard } from "utils/api/blush/paymentCard";
import { getAppointmentsByClientId } from "utils/api/blush/appointment";
import AuthService from "../utils/auth";
import AddCardModal from "./AddCardModal";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";

import { ServiceTypeI } from "../types/service";
import StylistI from "../types/stylist";
import CardI from "../types/card";
import AppointmentI from "../types/appointment";
import ClientI from "../types/client";

import "../styles/UserArea.css";
import { useAppointments, usePaymentCards } from "../context/UserDataContext";

interface UserAreaProps {
    client: ClientI | null;
    setClient: (client: ClientI | null) => void;
    firstTime: boolean;
    setFirstTime: (firstTime: boolean) => void;
    stylistData: StylistI[];
    bookType: string;
    clientNav: string;
    setClientNav: (clientNav: string) => void;
    rebook: {
        setBookType: (bookType: string) => void;
        setServiceType: (serviceTypeId: number) => void;
        setAddService: (addServiceIds: number[]) => void;
        setAddServicePass: (addServicePass: boolean) => void;
        setService: (serviceId: number) => void;
        setStylist: (stylistId: number) => void;
    };
    serviceTypes: ServiceTypeI[];
}

// const placeholderStylist: StylistI[] = [
//     {
//         id: 1,
//         name: "Courtney",
//         src: "../assets/staff/Courtney.avif"
//     },
//     {
//         id: 2,
//         name: "Jen",
//         src: "../assets/staff/Jen.avif"
//     }
// ]

// const placeholderAddService: AddServiceI[] = [
//     {
//         id: 1,
//         type: "Deep Conditioning Treatment",
//         priceBottom: 25,
//         priceTop: 25,

//     }, {
//         id: 2,
//         type: "Brow Wax & Tint",
//         priceBottom: 30,
//         priceTop: 30,
//     }
// ];

const placeholderAppointment: AppointmentI[] = [
    {
        id: 1,
        clientId: 1,
        serviceTypeId: 1,
        serviceId: 1,
        stylistId: 1,
        addServiceIds: [1],
        startTime: new Date("2025-10-01T10:00:00-04:00"),
        endTime: new Date("2025-10-01T11:00:00-04:00"),
    },
    {
        id: 2,
        clientId: 1,
        serviceTypeId: 2,
        serviceId: 2,
        stylistId: 1,
        addServiceIds: [1, 2],
        startTime: new Date("2024-10-15T10:00:00-04:00"),
        endTime: new Date("2024-10-15T11:00:00-04:00"),
    },
    {
        id: 3,
        clientId: 1,
        serviceTypeId: 1,
        serviceId: 2,
        stylistId: 1,
        addServiceIds: [],
        startTime: new Date("2024-09-20T10:00:00-04:00"),
        endTime: new Date("2024-09-20T11:00:00-04:00"),
    }
]

const cardPlaceholder: CardI[] = [
    {
        clientId: 1,
        cardHolderName: "John Doe",
        cardNumber: "2345 3452 4345 1234",
        cardType: "Visa",
        expiryDate: "12/25",
        zipCode: "12345",
        isPrimary: true,
    },
    {
        clientId: 1,
        cardHolderName: "Jane Doe",
        cardNumber: "5436 3456 3456 5678",
        cardType: "MasterCard",
        expiryDate: "11/28",
        zipCode: "67890",
        isPrimary: false,
    }
]
    


// const placeholderClient: ClientI = {
//     id: 1,
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane.doe@gmail.com",
//     phone: "(864) 123-4567",
//     emailOptIn: true,
// }

export default function UserArea({ client, setClient, firstTime, setFirstTime, bookType, clientNav, setClientNav, rebook }: UserAreaProps) {
    const [upcomingAppointment, setUpcomingAppointment] = useState<any>(placeholderAppointment[0]);
    const [previousAppointments, setPreviousAppointments] = useState<any[]>([placeholderAppointment[0], placeholderAppointment[1], placeholderAppointment[2]]);
    const [paymentCards, setPaymentCards] = useState<CardI[]>(cardPlaceholder);
    const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);
    const [deleteCardModalOpen, setDeleteCardModalOpen] = useState<boolean>(false);
    const [updateCardModalOpen, setUpdateCardModalOpen] = useState<boolean>(false);
    const [cardToUpdate, setCardToUpdate] = useState<CardI | null>(null);
    const { appointmentsContext, setAppointmentsContext } = useAppointments();
    const { paymentCardsContext, setPaymentCardsContext } = usePaymentCards();

    useEffect(() => {
        if (AuthService.loggedIn()) {
            const profile = AuthService.getProfile();
            setClient({
                id: profile.clientId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                emailOptIn: profile.emailOptIn
            });

            if (appointmentsContext.length === 0) {
                getAppointmentsByClientId(profile.clientId)
                    .then((data) => {
                        setAppointmentsContext(data);
                        if (data.length > 0) {
                            const sortedAppointments = data.sort((a: AppointmentI, b: AppointmentI) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
                            setUpcomingAppointment(sortedAppointments[0]);
                            setPreviousAppointments(sortedAppointments.slice(1));
                            if (sortedAppointments.slice(1).length > 0) {
                                setFirstTime(false);
                            } else {
                                setFirstTime(true);
                            }
                        } else {
                            setUpcomingAppointment(null);
                            setPreviousAppointments([]);
                            setFirstTime(true);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching appointments:", error);
                    });
            }

            if (paymentCardsContext.length === 0) {
                getPaymentCardsByClientId(profile.clientId)
                    .then((data) => {
                        setPaymentCardsContext(data);
                        setPaymentCards(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching payment cards:", error);
                    });
            }
        } else {
            setClient(null);
            setAppointmentsContext([]);
            setPaymentCardsContext([]);
            setUpcomingAppointment(null);
            setPreviousAppointments([]);
            setPaymentCards([]);
        }
    }, []);

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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "");
        e.target.value = value;
    }

    interface OnAddCardFn {
        (card: CardI): void;
    }

    const onAddCard: OnAddCardFn = async (card: CardI) => {
        const newCard = await createPaymentCard(card)
        setPaymentCards([...paymentCards, newCard]);
        setPaymentCardsContext([...paymentCardsContext, newCard]);
    };

    interface OnUpdateCardFn {
        (updateCard: CardI): void;
    }

    const onUpdateCard: OnUpdateCardFn = (updateCard: CardI) => {
        setPaymentCards(paymentCards.map((card: CardI) => card.id === updateCard.id ? updateCard : card));
        setPaymentCardsContext(paymentCardsContext.map((card: CardI) => card.id === updateCard.id ? updateCard : card));
        if (updateCard.id !== undefined) {
            updatePaymentCard(updateCard.id, updateCard);
        }
    };

    interface OnDeleteCardFn {
        (cardToDelete: CardI): void;
    }

    const onDeleteCard: OnDeleteCardFn = (cardToDelete: CardI) => {
        setPaymentCards(paymentCards.filter((card: CardI) => card.id !== cardToDelete.id));
        setPaymentCardsContext(paymentCardsContext.filter((card: CardI) => card.id !== cardToDelete.id));
        if (cardToDelete.id !== undefined) {
            deletePaymentCard(cardToDelete.id);
        }
    };

    const updatePrimaryCard = (cardId?: number) => {
        if (cardId === undefined) {
            setPaymentCards(paymentCards.map((card: CardI) => {
                return { ...card, isPrimary: false };
            }));
            setPaymentCardsContext(paymentCardsContext.map((card: CardI) => {
                return { ...card, isPrimary: false };
            }));
        } else {
            setPaymentCards(paymentCards.map((card: CardI) => {
                if (card.id === cardId) {
                    return { ...card, isPrimary: true };
                } else {
                    return { ...card, isPrimary: false };
                }
            }));
            setPaymentCardsContext(paymentCardsContext.map((card: CardI) => {
                if (card.id === cardId) {
                    return { ...card, isPrimary: true };
                } else {
                    return { ...card, isPrimary: false };
                }
            }));
        }
    }

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
        rebook.setStylist(appointment.stylistId);
        rebook.setServiceType(appointment.serviceTypeId);
        rebook.setService(appointment.serviceId);
        rebook.setAddService(appointment.addServiceIds || []);
        setClientNav("");
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const emailSpanEl = document.getElementById("signInEmailSpan") as HTMLSpanElement;
        const passwordSpanEl = document.getElementById("signInPasswordSpan") as HTMLSpanElement;
        const submitSpanEl = document.getElementById("bookOnlineReturningFormSpan") as HTMLSpanElement;

        const emailValue = formData.get("signInEmail") as string;
        const passwordValue = formData.get("signInPassword") as string;
        
        emailSpanEl.textContent = "";
        passwordSpanEl.textContent = "";
        submitSpanEl.textContent = "";

        if (!emailValue) {
            emailSpanEl.textContent = "Please enter your email.";
            return;
        }

        if (!validator.isEmail(emailValue)) {
            emailSpanEl.textContent = "Please enter a valid email.";
            return;
        }

        if (!passwordValue) {
            passwordSpanEl.textContent = "Please enter your password.";
            return;
        }

        if (passwordValue.length < 6) {
            passwordSpanEl.textContent = "Password must be at least 6 characters.";
            return;
        }

        const response = await loginClient(emailValue, passwordValue);

        if (!response) {
            submitSpanEl.textContent = "Invalid email or password.";
            return;
        }

        AuthService.login(response);
        const decoded = AuthService.getProfile();
        setClient({
            id: decoded.clientId,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            phone: decoded.phone,
            emailOptIn: decoded.emailOptIn
        });

        setClientNav("Appointments");

        const appointmentData = await getAppointmentsByClientId(decoded.clientId);
        setAppointmentsContext(appointmentData);
        if (appointmentData.length > 0) {
            const sortedAppointments = appointmentData.sort((a: AppointmentI, b: AppointmentI) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
            setUpcomingAppointment(sortedAppointments[0]);
            setPreviousAppointments(sortedAppointments.slice(1));
            if (sortedAppointments.slice(1).length > 0) {
                setFirstTime(false);
            } else {
                setFirstTime(true);
            }
        } else {
            setUpcomingAppointment(null);
            setPreviousAppointments([]);
            setFirstTime(true);
        }

        const paymentCardsData = await getPaymentCardsByClientId(decoded.clientId);
        setPaymentCardsContext(paymentCardsData);
        setPaymentCards(paymentCardsData);
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const firstNameSpanEl = document.getElementById("signUpFirstNameSpan") as HTMLSpanElement;
        const lastNameSpanEl = document.getElementById("signUpLastNameSpan") as HTMLSpanElement;
        const emailSpanEl = document.getElementById("signUpEmailSpan") as HTMLSpanElement;
        const phoneSpanEl = document.getElementById("signUpPhoneSpan") as HTMLSpanElement;
        const passwordSpanEl = document.getElementById("signUpPasswordSpan") as HTMLSpanElement;
        const confirmSpanEl = document.getElementById("signUpConfirmSpan") as HTMLSpanElement;
        const submitSpanEl = document.getElementById("bookOnlineNewFormSpan") as HTMLSpanElement;

        const firstNameValue = formData.get("signUpFirstName") as string;
        const lastNameValue = formData.get("signUpLastName") as string;
        const emailValue = formData.get("signUpEmail") as string;
        const phoneValue = formData.get("signUpPhone") as string;
        const passwordValue = formData.get("signUpPassword") as string;
        const confirmValue = formData.get("signUpConfirm") as string;
        const emailOptInValue = formData.get("signUpEmailOptInCheckbox") !== null;

        firstNameSpanEl.textContent = "";
        lastNameSpanEl.textContent = "";
        emailSpanEl.textContent = "";
        phoneSpanEl.textContent = "";
        passwordSpanEl.textContent = "";
        confirmSpanEl.textContent = "";
        submitSpanEl.textContent = "";

        if (!firstNameValue) {
            firstNameSpanEl.textContent = "Please enter your first name.";
            return;
        }

        if (!lastNameValue) {
            lastNameSpanEl.textContent = "Please enter your last name.";
            return;
        }

        if (!emailValue) {
            emailSpanEl.textContent = "Please enter your email.";
            return;
        }

        if (!validator.isEmail(emailValue)) {
            emailSpanEl.textContent = "Please enter a valid email.";
            return;
        }

        if (!phoneValue) {
            phoneSpanEl.textContent = "Please enter your phone number.";
            return;
        }

        if (!validator.isMobilePhone(phoneValue, 'any', { strictMode: false })) {
            phoneSpanEl.textContent = "Please enter a valid phone number.";
            return;
        }

        if (!passwordValue) {
            passwordSpanEl.textContent = "Please enter your password.";
            return;
        }

        if (passwordValue.length < 6) {
            passwordSpanEl.textContent = "Password must be at least 6 characters.";
            return;
        }

        if (!/[A-Z]/.test(passwordValue)) {
            passwordSpanEl.textContent = "Password must contain at least one uppercase letter.";
            return;
        }

        if (!/[a-z]/.test(passwordValue)) {
            passwordSpanEl.textContent = "Password must contain at least one lowercase letter.";
            return;
        }

        if(!/[0-9]/.test(passwordValue)) {
            passwordSpanEl.textContent = "Password must contain at least one number.";
            return;
        }

        if(!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            passwordSpanEl.textContent = "Password must contain at least one special character.";
            return;
        }

        if (!confirmValue) {
            confirmSpanEl.textContent = "Please confirm your password.";
            return;
        }

        if (passwordValue !== confirmValue) {
            confirmSpanEl.textContent = "Passwords do not match.";
            return;
        }

        const clientData: ClientI = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            phone: phoneValue,
            password: passwordValue,
            emailOptIn: emailOptInValue,
        };

        const response = await createClient(clientData);

        if (!response) {
            submitSpanEl.textContent = "That email is already in use. Please try another or use Forgot Password.";
            return;
        }

        AuthService.login(response);
        const decoded = AuthService.getProfile();
        setClient({
            id: decoded.clientId,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            phone: decoded.phone,
            emailOptIn: decoded.emailOptIn
        });

        setClientNav("Profile");
        setFirstTime(true);
    }

    const handleUpdateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const firstNameSpanEl = document.getElementById("updateFirstNameSpan") as HTMLSpanElement;
        const lastNameSpanEl = document.getElementById("updateLastNameSpan") as HTMLSpanElement;
        const emailSpanEl = document.getElementById("updateEmailSpan") as HTMLSpanElement;
        const phoneSpanEl = document.getElementById("updatePhoneSpan") as HTMLSpanElement;
        const passwordSpanEl = document.getElementById("updatePasswordSpan") as HTMLSpanElement;
        const confirmSpanEl = document.getElementById("updateConfirmSpan") as HTMLSpanElement;
        const submitSpanEl = document.getElementById("bookOnlineUpdateFormSpan") as HTMLSpanElement;

        const firstNameInput = formData.get("updateFirstName") as string;
        const lastNameInput = formData.get("updateLastName") as string;
        const emailInput = formData.get("updateEmail") as string;
        const phoneInput = formData.get("updatePhone") as string;
        const passwordInput = formData.get("updatePassword") as string;
        const confirmInput = formData.get("updateConfirm") as string;
        const emailOptInValue = formData.get("updateEmailOptInCheckbox") !== null;

        firstNameSpanEl.textContent = "";
        lastNameSpanEl.textContent = "";
        emailSpanEl.textContent = "";
        phoneSpanEl.textContent = "";
        passwordSpanEl.textContent = "";
        confirmSpanEl.textContent = "";
        submitSpanEl.textContent = "";

        const firstNameValue = firstNameInput ? firstNameInput : (client?.firstName ?? "");
        const lastNameValue = lastNameInput ? lastNameInput : (client?.lastName ?? "");
        
        let emailValue = "";
    
        if (!emailInput) {
            emailValue = client?.email || "";
        } else {
            if (!validator.isEmail(emailInput)) {
                emailSpanEl.textContent = "Please enter a valid email.";
                return;
            } else {
                emailValue = emailInput;
            }
        }

        let phoneValue = "";

        if (!phoneInput) {
            phoneValue = client?.phone || "";
        } else {
            if (!validator.isMobilePhone(phoneInput, 'any', { strictMode: false })) {
                phoneSpanEl.textContent = "Please enter a valid phone number.";
                return;
            } else {
                phoneValue = phoneInput;
            }
        }

        let passwordValue = "";

        if (passwordInput) {
            if (passwordInput.length < 6) {
                passwordSpanEl.textContent = "Password must be at least 6 characters.";
                return;
            }

            if (!/[A-Z]/.test(passwordInput)) {
                passwordSpanEl.textContent = "Password must contain at least one uppercase letter.";
                return;
            }

            if (!/[a-z]/.test(passwordInput)) {
                passwordSpanEl.textContent = "Password must contain at least one lowercase letter.";
                return;
            }

            if(!/[0-9]/.test(passwordInput)) {
                passwordSpanEl.textContent = "Password must contain at least one number.";
                return;
            }

            if(!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput)) {
                passwordSpanEl.textContent = "Password must contain at least one special character.";
                return;
            }

            if (!confirmInput) {
                confirmSpanEl.textContent = "Please confirm your password.";
                return;
            }

            if (passwordInput !== confirmInput) {
                confirmSpanEl.textContent = "Passwords do not match.";
                return;
            }

            passwordValue = passwordInput;
        }

        const clientData: ClientI = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            phone: phoneValue,
            password: passwordValue,
            emailOptIn: emailOptInValue,
        };

        if (client?.id === undefined) {
            submitSpanEl.textContent = "Unable to update: client ID is missing.";
            return;
        }

        const response = await updateClient(client.id, clientData);

        AuthService.login(response);
        const decoded = AuthService.getProfile();
        setClient({
            id: decoded.clientId,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            phone: decoded.phone,
            emailOptIn: decoded.emailOptIn
        });
    }

    return (
        <section id="bookOnlineWelcome" className={`bookOnlineSection ${client ? (clientNav ? "bookOnlineClientNavHeader" : "bookOnlineMobileHeader") : ""}`}>
            {clientNav === "Appointments" && !bookType &&<h1 id="bookOnlineWelcomeHeader">Welcome{client ? (firstTime ? ` ${client.firstName}!` : ` back ${client.firstName}!`) : "!"}</h1>}
            {!client ?
                <div id="bookOnlineWelcomeForm">
                    <form id="bookOnlineReturningForm" onSubmit={e => handleSignIn(e)}>
                        <div id="bookOnlineReturningFormInputCon">
                            <h3 id="bookOnlineReturningFormHeader" className="bookOnlineFormHeader">Returning Client</h3>
                            <span id="signInEmailSpan"></span>
                            <input id="signInEmail" className="bookOnlineFormInput" name="signInEmail" type="email" placeholder="Email" onChange={(e) => handleEmailChange(e)}/>
                            <span id="signInPasswordSpan"></span>
                            <input id="signInPassword" className="bookOnlineFormInput" name="signInPassword" type="password" placeholder="Password" />
                        </div>
                        <span id="bookOnlineReturningFormSpan"></span>
                        <input className="bookOnlineFormButton" type="submit" value="Sign In" />
                    </form>
                    <form id="bookOnlineNewForm" onSubmit={e => handleSignUp(e)}>
                        <span id="bookOnlineNewFormSpan">OR</span>
                        <h3 id="bookOnlineNewFormHeader" className="bookOnlineFormHeader">New Client</h3>
                        <span id="signUpFirstNameSpan"></span>
                        <input id="signUpFirstName" className="bookOnlineFormInput" name="signUpFirstName" type="text" placeholder="First Name" onChange={(e) => handleTextChange(e)} />
                        <span id="signUpLastNameSpan"></span>
                        <input id="signUpLastName" className="bookOnlineFormInput" name="signUpLastName" type="text" placeholder="Last Name" onChange={(e) => handleTextChange(e)} />
                        <span id="signUpEmailSpan"></span>
                        <input id="signUpEmail" className="bookOnlineFormInput" name="signUpEmail" type="email" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
                        <span id="signUpPhoneSpan"></span>
                        <input id="signUpPhone" className="bookOnlineFormInput" name="signUpPhone" type="tel" placeholder="Phone" onChange={(e) => handlePhoneChange(e)} />
                        <span id="signUpPasswordSpan"></span>
                        <input id="signUpPassword" className="bookOnlineFormInput" name="signUpPassword" type="password" placeholder="Password" />
                        <span id="signUpConfirmSpan"></span>
                        <input id="signUpConfirm" className="bookOnlineFormInput" name="signUpConfirm" type="password" placeholder="Confirm Password" />
                        <div className="emailOptInContainer">
                            <div className="emailOptInCheckboxContainer">
                                <input type="checkbox" id="signUpEmailOptInCheckbox" className="emailOptInCheckbox" name="signUpEmailOptInCheckbox" />
                                <svg className="emailOptInCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                </svg>
                            </div>
                            <label htmlFor="signUpEmailOptInCheckbox" className="emailOptInLabel">I would like to receive emails about specials, events, and promotions.</label>
                        </div>
                        <span id="bookOnlineNewFormSpan"></span>
                        <input className="bookOnlineFormButton" type="submit" value="Sign Up"  />
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
                            <form id="bookOnlineNewForm" onSubmit={e => handleUpdateClient(e)}>
                                <h3 id="bookOnlineNewFormHeader" className="bookOnlineFormHeader">Your Info</h3>
                                <div className="bookOnlineFormInputContainer">
                                    <label htmlFor="updateFirstName" className="bookOnlineFormLabel">First Name</label>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updateFirstName" className="bookOnlineFormInput" name="updateFirstName" type="text" placeholder={client.firstName} onChange={(e) => handleTextChange(e)} />
                                        <span id="updateFirstNameSpan"></span>
                                    </div>
                                    <label htmlFor="updateLastName" className="bookOnlineFormLabel">Last Name</label>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updateLastName" className="bookOnlineFormInput" name="updateLastName" type="text" placeholder={client.lastName} onChange={(e) => handleTextChange(e)} />
                                        <span id="updateLastNameSpan"></span>
                                    </div>
                                    <label htmlFor="updateEmail" className="bookOnlineFormLabel">E-Mail</label>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updateEmail" className="bookOnlineFormInput" name="updateEmail" type="email" placeholder={client.email} onChange={e => handleEmailChange(e)}/>
                                        <span id="updateEmailSpan"></span>
                                    </div>
                                    <label htmlFor="updatePhone" className="bookOnlineFormLabel">Phone</label>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updatePhone" className="bookOnlineFormInput" name="updatePhone" type="tel" placeholder={client.phone} onChange={(e) => handlePhoneChange(e)} />
                                        <span id="updatePhoneSpan"></span>
                                    </div>
                                    <div/>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updatePassword" className="bookOnlineFormInput" name="updatePassword" type="password" placeholder="New Password" />
                                        <span id="updatePasswordSpan"></span>
                                    </div>
                                    <div/>
                                    <div className="bookOnlineFormInputContainer">
                                        <input id="updateConfirm" className="bookOnlineFormInput" name="updateConfirm" type="password" placeholder="Confirm New Password" />
                                        <span id="updateConfirmSpan"></span>
                                    </div>
                                    <div/>
                                    <div className="emailOptInContainer">
                                        <div className="emailOptInCheckboxContainer">
                                            <input type="checkbox" checked={client.emailOptIn} id="updateEmailOptInCheckbox" className="emailOptInCheckbox" name="updateEmailOptInCheckbox" />
                                            <svg className="emailOptInCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                            </svg>
                                        </div>
                                        <label htmlFor="updateEmailOptInCheckbox" className="emailOptInLabel">I would like to receive emails about specials, events, and promotions.</label>
                                    </div>
                                </div>
                                <span id="bookOnlineUpdateFormSpan"></span>
                                <input className="bookOnlineFormButton" type="submit" value="Update" />
                            </form>
                        )}
                        {clientNav === "Payment Methods" && (
                            <div id="bookOnlinePaymentMethods">
                                <h3 id="bookOnlinePaymentMethodsHeader" className="bookOnlineFormHeader">Payment Methods</h3>
                                <ul id="bookOnlinePaymentMethodsList">
                                    {paymentCards.map((card: any, index: number) => (
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
            <AddCardModal addCardModalOpen={addCardModalOpen} setAddCardModalOpen={setAddCardModalOpen} onAddCard={() => onAddCard} updatePrimaryCard={() => updatePrimaryCard} />
            {cardToUpdate && <DeleteCardModal deleteCardModalOpen={deleteCardModalOpen} setDeleteCardModalOpen={setDeleteCardModalOpen} cardToDelete={cardToUpdate} onDeleteCard={() => onDeleteCard} updatePrimaryCard={() => updatePrimaryCard} paymentCardsContext={paymentCardsContext} /> }
            {cardToUpdate && <UpdateCardModal updateCardModalOpen={updateCardModalOpen} setUpdateCardModalOpen={setUpdateCardModalOpen} cardToUpdate={cardToUpdate} onUpdateCard={() => onUpdateCard} updatePrimaryCard={() => updatePrimaryCard} /> }
        </section>
    );
}
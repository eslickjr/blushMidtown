import "../styles/AddCardModal.css";
import { useState } from "react";
import AuthService from "../utils/auth";
import CardI from "../types/card";

interface AddCardModalProps {
    addCardModalOpen: boolean;
    setAddCardModalOpen: (open: boolean) => void;
    onAddCard: (card: CardI) => void;
    updatePrimaryCard: (cardId?: number) => void;
}

export default function AddCardModal({addCardModalOpen, setAddCardModalOpen, onAddCard, updatePrimaryCard}: AddCardModalProps) {
    const [clientInfo] = useState(AuthService.getProfile());

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
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

        e.target.value = formattedInput; // Set the formatted value back to the input
    }

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        let formattedInput = '';

        if (input.length > 0) {
            formattedInput += input.slice(0, 2); // Add first two digits (MM)
        }

        if (input.length > 2) {
            formattedInput += '/'; // Add slash after MM
            formattedInput += input.slice(2, 4); // Add next two digits (YY)
        }

        e.target.value = formattedInput; // Set the formatted value back to the input
    }

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 5); // Remove non-digit characters

        e.target.value = input
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const cardNumberSpan = document.getElementById("addCardNumberSpan") as HTMLSpanElement;
        const expirySpan = document.getElementById("addCardExpirySpan") as HTMLSpanElement;
        const zipSpan = document.getElementById("addCardZipSpan") as HTMLSpanElement;

        let errors = false;

        const cardHolderNameRaw = formData.get("cardHolderName") as string;
        const cardHolderName = cardHolderNameRaw.trim() === "" ? `${clientInfo.firstName} ${clientInfo.lastName}` : cardHolderNameRaw;
        
        const cardNumberRaw = formData.get("cardNumber") as string;
        const cardNumber = cardNumberRaw.replace(/\s/g, '');
        if (cardNumber.length < 16) {
            cardNumberSpan.textContent = "Card number must be 16 digits";
            errors = true;
        } else {
            cardNumberSpan.textContent = ""; // Clear any previous error message
        }

        const expiryDate = formData.get("expiryDate") as string;
        if (expiryDate.slice(0, 2) < "01" || expiryDate.slice(0, 2) > "12") {
            expirySpan.textContent = "Invalid month in expiration date";
            errors = true;
        } else if (expiryDate.length !== 5) {
            expirySpan.textContent = "Expiry date not completed";
            errors = true;
        } else {
            expirySpan.textContent = ""; // Clear any previous error message
        }

        const zipCode = formData.get("zipCode") as string;
        if (zipCode.length !== 5) {
            zipSpan.textContent = "Zip code must be 5 digits";
            errors = true;
        } else {
            zipSpan.textContent = ""; // Clear any previous error message
        }

        if (errors) {
            return; // Stop form submission if there are errors
        }

        const isPrimary = formData.get("addCardMakePrimaryCheckbox") !== null;

        if (isPrimary) {
            updatePrimaryCard()
        }

        const newCard: CardI = {
            clientId: clientInfo.clientId,
            cardHolderName: cardHolderName,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            zipCode: zipCode,
            isPrimary: isPrimary
        };

        // Call the onAddCard function to handle the new card
        onAddCard(newCard);

        // Clear form fields
        (e.target as HTMLFormElement).reset();
        // Reset the form and close the modal
        setAddCardModalOpen(false);
    }

    const handleCloseAddCardModal = () => {
        const cardNumberSpan = document.getElementById("addCardNumberSpan") as HTMLSpanElement;
        const expirySpan = document.getElementById("addCardExpirySpan") as HTMLSpanElement;
        const zipSpan = document.getElementById("addCardZipSpan") as HTMLSpanElement;
        cardNumberSpan.textContent = "";
        expirySpan.textContent = "";
        zipSpan.textContent = "";

        setAddCardModalOpen(false);
        const timeoutId = setTimeout(() => {
            const form = document.getElementById("addCardForm") as HTMLFormElement | null;
            if (form) form.reset();
        }, 500); // Wait for the modal to close before resetting the form
        return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
    }

    return (
        <div id="addCardModalWrapper" className={addCardModalOpen ? "addCardModalOpen" : ""} onClick={() => handleCloseAddCardModal()}>
            <div id="addCardModal" onClick={(e) => e.stopPropagation()}>
                <h2 id="addCardHeader">Card Details</h2>
                <form id="addCardForm" onSubmit={(e) => handleFormSubmit(e)}>
                    {/* <label id="addCardNumberLabel" className="addCardLabel" htmlFor="cardNumber">Card Number</label> */}
                    <input type="text" id="addCardHolderName" className="addCardInput" name="cardHolderName" placeholder={`${clientInfo.firstName} ${clientInfo.lastName}`} onChange={(e) => handleTextChange(e)} />
                    <span id="addCardHolderNameSpan" className="addCardSpan"></span>
                    
                    {/* <label id="addCardNumberLabel" className="addCardLabel" htmlFor="cardNumber">Card Number</label> */}
                    <input type="text" id="addCardNumber" className="addCardInput" name="cardNumber" placeholder="Card Number" onChange={(e) => handleCardNumberChange(e)} />
                    <span id="addCardNumberSpan" className="addCardSpan"></span>
                    
                    {/* <label id="addCardExpiryLabel" className="addCardLabel" htmlFor="expiryDate">Expiry Date</label> */}
                    <input type="text" id="addCardExpiryDate" className="addCardInput" name="expiryDate" placeholder="Expiration Date" onChange={(e) => handleExpiryDateChange(e)} />
                    <span id="addCardExpirySpan" className="addCardSpan"></span>
                    
                    {/* <label id="addCardZipLabel" className="addCardLabel" htmlFor="zipCode">Zip Code</label> */}
                    <input type="text" id="addCardZip" className="addCardInput" name="zipCode" placeholder="Zip Code" onChange={(e) => handleZipCodeChange(e)} />
                    <span id="addCardZipSpan" className="addCardSpan"></span>
                    
                    <div id="addCardMakePrimaryContainer">
                        <div id="addCardMakePrimaryCheckboxContainer">
                            <input type="checkbox" id="addCardMakePrimaryCheckbox" name="addCardMakePrimaryCheckbox" />
                            <svg id="addCardMakePrimaryCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </div>
                        <label htmlFor="addCardMakePrimaryCheckbox" id="addCardMakePrimaryLabel">Make Primary</label>
                    </div>

                    <button id="addCardButton" type="submit">Add Card</button>
                </form>
            </div>
        </div>
    );
}
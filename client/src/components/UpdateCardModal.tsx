import { useState, useEffect } from "react";

import "../styles/UpdateCardModal.css";

import CardI from "../types/card";

interface UpdateCardModalProps {
    updateCardModalOpen: boolean;
    setUpdateCardModalOpen: (open: boolean) => void;
    cardToUpdate: CardI;
    onUpdateCard: (card: CardI) => void;
    updatePrimaryCard: (cardId?: number) => void;
}

export default function UpdateCardModal({updateCardModalOpen, setUpdateCardModalOpen, cardToUpdate, onUpdateCard, updatePrimaryCard}: UpdateCardModalProps) {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardChecked, setCardChecked] = useState(cardToUpdate.isPrimary);
    
    useEffect(() => {
        setCardChecked(cardToUpdate.isPrimary);
    }, [cardToUpdate]);

    const handleCardChecked = () => {
        if (!cardToUpdate.isPrimary) {
            setCardChecked(!cardChecked); // Set the card as primary if it was not already
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
        setCardHolderName(input); // Update the state with the cleaned input
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        let formattedInput = '';

        for (let i = 0; i < digitsOnly.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedInput += ' '; // Add space every 4 digits
            }
            formattedInput += digitsOnly[i];
        }

        if (formattedInput.length > 19) {
            formattedInput = formattedInput.slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
        }

        console.log("Formatted Card Number:", formattedInput);
        setCardNumber(formattedInput); // Update the state with the formatted value
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

    const getMaskedCard = (input: string) => {
        const digitsOnly = input.replace(/\D/g, ''); // Remove non-digit characters
        const maskedInput = digitsOnly.replace(/\d(?=\d{4})/g, '*');
        let formattedInput = '';

        for (let i = 0; i < maskedInput.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedInput += ' '; // Add space every 4 digits
            }
            formattedInput += maskedInput[i];
        }

        if (formattedInput.length > 19) {
            formattedInput = formattedInput.slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
        }

        return formattedInput;
    }

    const updateCard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const numberSpan = document.getElementById("updateCardNumberSpan") as HTMLSpanElement;
        const expirySpan = document.getElementById("updateCardExpirySpan") as HTMLSpanElement;
        const zipSpan = document.getElementById("updateCardZipSpan") as HTMLSpanElement;

        let errors = false;

        let cardHolderToUse = "";
        if (cardHolderName) {
            if (cardHolderName.trim() === "") {
                cardHolderToUse = `${cardToUpdate.cardHolderName}`;
            } else {
                cardHolderToUse = cardHolderName;
            }
        }

        let numberToUse = "";
        if (cardNumber) {
            if (cardNumber.length < 16) {
                numberSpan.textContent = "Card number must be 16 digits";
                errors = true;
            } else {
                numberToUse = cardNumber;
                numberSpan.textContent = ""; // Clear any previous error message
            }
        } else {
            numberToUse = cardToUpdate.cardNumber; // Use existing card number if not provided
            numberSpan.textContent = "";
        }

        let expiryDate = "";
        if (e.currentTarget.expiryDate.value) {
            if (e.currentTarget.expiryDate.value.length !== 5) {
                expirySpan.textContent = "Expiry date not completed";
                errors = true;
            } else if (e.currentTarget.expiryDate.value.slice(0, 2) < "01" || e.currentTarget.expiryDate.value.slice(0, 2) > "12") {
                expirySpan.textContent = "Invalid month";
                errors = true;
            } else {
                expiryDate = e.currentTarget.expiryDate.value;
                expirySpan.textContent = ""; // Clear any previous error message
            }
        } else {
            expiryDate = cardToUpdate.expiryDate; // Use existing expiry date if not provided
            expirySpan.textContent = "";
        }
        
        let zipCode = "";
        if (e.currentTarget.zipCode.value) {
            if (e.currentTarget.zipCode.value.length !== 5) {
                zipSpan.textContent = "Zip code must be 5 digits";
                errors = true;
            } else { 
                zipCode = e.currentTarget.zipCode.value;
                zipSpan.textContent = ""; // Clear any previous error message
            }
        } else {
            zipCode = cardToUpdate.zipCode; // Use existing zip code if not provided
            zipSpan.textContent = "";
        }
        
        if (errors) {
            return; // Stop the function if there are errors
        }

        const isPrimary = e.currentTarget.updateCardMakePrimaryCheckbox.checked;
        const updateCard: CardI = {
            clientId: cardToUpdate.clientId,
            cardHolderName: cardHolderToUse,
            cardNumber: numberToUse,
            expiryDate: expiryDate,
            zipCode: zipCode,
            isPrimary: isPrimary
        };

        if (isPrimary !== cardToUpdate.isPrimary) {
            if (isPrimary) {
                // If the card is being made primary, update other cards to not be primary
                updatePrimaryCard(cardToUpdate.id);
            }
        }
        // Call the onUpdateCard function to handle the updated card
        onUpdateCard(updateCard);
        // Clear form fields
        const form = document.getElementById("updateCardForm") as HTMLFormElement | null;
        if (form) form.reset(); // Reset the form fields
        setUpdateCardModalOpen(false);
    }

    const handleCloseUpdateCardModal = () => {
        const updateCardNumberSpan = document.getElementById("updateCardNumberSpan") as HTMLSpanElement;
        const updateCardExpirySpan = document.getElementById("updateCardExpirySpan") as HTMLSpanElement;
        const updateCardZipSpan = document.getElementById("updateCardZipSpan") as HTMLSpanElement;
        updateCardNumberSpan.textContent = "";
        updateCardExpirySpan.textContent = "";
        updateCardZipSpan.textContent = "";
        setCardNumber("");

        setUpdateCardModalOpen(false);
        const timeoutId = setTimeout(() => {
            const form = document.getElementById("updateCardForm") as HTMLFormElement | null;
            if (form) form.reset();
        }, 500); // Wait for the modal to close before resetting the form
        return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
    }

    return (
        <div id="updateCardModalWrapper" className={updateCardModalOpen ? "updateCardModalOpen" : ""} onClick={() => handleCloseUpdateCardModal()}>
            <div id="updateCardModal" onClick={(e) => e.stopPropagation()}>
                <h2 id="updateCardHeader">Card Details</h2>
                <form id="updateCardForm" onSubmit={(e) => updateCard(e)}>
                    <div id="updateCardFormInputContainer">
                        <label id="updateCardholderNameLabel" className="updateCardLabel" htmlFor="cardHolderName">Card Holder Name</label>
                        <input type="text" id="updateCardHolderName" className="updateCardInput" name="cardHolderName" value={cardHolderName} placeholder={cardToUpdate.cardHolderName} onChange={(e) => handleNameChange(e)} />
                        
                        <label id="updateCardNumberLabel" className="updateCardLabel" htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="updateCardNumber" className="updateCardInput" name="cardNumber" value={cardNumber} placeholder={getMaskedCard(cardToUpdate.cardNumber)} onChange={(e) => handleCardNumberChange(e)} />
                        <div />
                        <span id="updateCardNumberSpan" className="updateCardSpan"></span>
                        
                        <label id="updateCardExpiryLabel" className="updateCardLabel" htmlFor="expiryDate">Expiry Date</label>
                        <input type="text" id="updateCardExpiryDate" className="updateCardInput" name="expiryDate" placeholder={cardToUpdate.expiryDate} onChange={(e) => handleExpiryDateChange(e)} />
                        <div />
                        <span id="updateCardExpirySpan" className="updateCardSpan"></span>
                        
                        <label id="updateCardZipLabel" className="updateCardLabel" htmlFor="zipCode">Zip Code</label>
                        <input type="text" id="updateCardZip" className="updateCardInput" name="zipCode" placeholder={cardToUpdate.zipCode} onChange={(e) => handleZipCodeChange(e)} />
                        <div />
                        <span id="updateCardZipSpan" className="updateCardSpan"></span>
                        
                        <div/>
                        <div id="updateCardMakePrimaryContainer">
                            <div id="updateCardMakePrimaryCheckboxContainer">
                                <input type="checkbox" id="updateCardMakePrimaryCheckbox" checked={cardChecked} name="updateCardMakePrimaryCheckbox" onClick={() => handleCardChecked}/>
                                <svg id="updateCardMakePrimaryCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                                </svg>
                            </div>
                            <label htmlFor="updateCardMakePrimaryCheckbox" id="updateCardMakePrimaryLabel">Make Primary</label>
                        </div>
                    </div>

                    <button id="updateCardButton" type="submit">Update Card</button>
                </form>
            </div>
        </div>
    );
}
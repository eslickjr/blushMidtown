import "../styles/DeleteCardModal.css";
import CardI from "../types/card";

interface DeleteCardModalProps {
    deleteCardModalOpen: boolean;
    setDeleteCardModalOpen: (open: boolean) => void;
    cardToDelete: CardI;
    onDeleteCard: (card: CardI) => void; // Callback function to handle deletion
    updatePrimaryCard: (cardId?: number) => void; // Optional, if you need to update primary card after deletion
    paymentCardsContext: CardI[]; // Context or state containing all payment cards
}

export default function DeleteCardModal({ deleteCardModalOpen, setDeleteCardModalOpen, cardToDelete, onDeleteCard, updatePrimaryCard, paymentCardsContext }: DeleteCardModalProps) {
    const handleDelete = () => {
        if (cardToDelete.isPrimary) {
            // If the card being deleted is primary, update primary card to undefined or another card
            if (paymentCardsContext.length > 1) {
                // Find the next primary card or set to undefined if no other cards exist
                const nextPrimaryCard = paymentCardsContext.find(card => card.id !== cardToDelete.id);
                updatePrimaryCard(nextPrimaryCard?.id);
            }
        }

        onDeleteCard(cardToDelete); // Call the provided delete function
        setDeleteCardModalOpen(false); // Close the modal after deletion
    };

    return (
        <div id="deleteCardModalWrapper" className={deleteCardModalOpen ? "deleteCardModalOpen" : ""} onClick={() => setDeleteCardModalOpen(false)}>
            <div id="deleteCardModal" onClick={(e) => e.stopPropagation()}>
                <h2 id="deleteCardHeader">Are you sure you want to delete this card?</h2>
                <div id="deleteCardButtons">
                    <button id="deleteCardConfirm" className="deleteCardButton" onClick={handleDelete}>
                        <svg className="deleteCardSVG" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </button>
                    <button id="deleteCardCancel" className="deleteCardButton" onClick={() => setDeleteCardModalOpen(false)}>
                        <svg className="deleteCardSVG" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

import '../styles/AppointmentModal.css';

interface AppointmentModalProps {
    mobile: boolean;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppointmentModal({ mobile, modal, setModal }: AppointmentModalProps) {
    const form = useRef<HTMLFormElement>(null);
    const [aptPhone, setAptPhone] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameInput = e.target as HTMLInputElement;
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, "");
      }
      const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let phone = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        
        
        if (phone.length > 0) {
          phone = '(' + phone;
        }
    
        if (phone.length > 4) {
          phone = phone.slice(0, 4) + ') ' + phone.slice(4);
        }
    
        if (phone.length > 9) {
          phone = phone.slice(0, 9) + '-' + phone.slice(9, 13);
        }
        
        setAptPhone(phone);
      }
      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailInput = e.target as HTMLInputElement;
        emailInput.value = emailInput.value.replace(/[^a-zA-Z0-9@._-]/g, "");
      }
    
      const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (form.current) {
          emailjs.sendForm(
            'service_v635jdv',
            'template_2dygy7n',
            form.current,
            'DsniDbEqda8GKVTuw'
          ).then((result) => {
            console.log(result.text);
            setModal(false);
          }, (error) => {
            console.log(error.text);
            alert("An error occurred while sending the message. Please try again later.");
          });
        } else {
          alert("Form reference is not available. Please try again.");
        }
      }
  
    return (
        <div id="landingModalWrapper" className={modal ? "active" : ""}>
            <div id="landingModalOverlay" onClick={() => {setModal(false)}}/>
            <div id="landingModalContainer">
                <form id="landingModal" ref={form} onSubmit={sendEmail}>
                    <div id="landingModalCloseContainer">
                        <h2 id="landingModalTitle">Book an Appointment</h2>
                        {!mobile && <input id="landingModalClose" type="button" value="X" onClick={() => {setModal(false)}}/>}
                    </div>
                    <label htmlFor="landingModalName" className="landingModalLabel">Name</label>
                    <input id="landingModalName" className="landingModalInput" type="text" name="name" onChange={handleNameChange} required />
                    <label htmlFor="landingModalEmail" className="landingModalLabel">Email</label>
                    <input id="landingModalEmail" className="landingModalInput" type="email" name="email" onChange={handleEmailChange} required />
                    <label htmlFor="landingModalPhone"className="landingModalLabel">Phone</label>
                    <input id="landingModalPhone" className="landingModalInput" type="tel" name="phone" value={aptPhone} onChange={handlePhoneChange} required />
                    <label htmlFor="landingModalMessage"className="landingModalLabel">Message</label>
                    <textarea id="landingModalMessage" className="landingModalTextArea" name="message" required />
                    <input type="hidden" name="time" value={new Date().toLocaleTimeString()} />
                    <input id="landingModalSubmit" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
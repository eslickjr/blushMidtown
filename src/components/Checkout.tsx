import "../styles/Checkout.css";
import Basket from "../types/basket";

interface CheckoutProps {
  setServiceDate: (date: Date | undefined) => void;
  basket: Basket; // Replace 'any' with the actual type of your basket
}


export default function Checkout({ setServiceDate, basket }: CheckoutProps) {

  const totalCost = basket.service.price + basket.addServices.reduce((total, addService) => total + addService.price, 0);

  const serviceCheckout = () => {
    console.log("Basket:", basket);
    return (
      <div id="checkoutServiceWrapper">
        <div id="checkoutServiceContainer">
          <h3 id="checkoutServiceDate">
            {basket.date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour:"numeric", minute: "2-digit" })} with&nbsp; 
            <div id="checkoutStylist">
              <img id="checkoutStylistImage" src={basket.stylist.src} alt={basket.stylist.name} />
            </div>
          </h3>
          <div id="checkoutService">
            <h4 id="checkoutServiceName">{basket.service.name}</h4>
            <p className="checkoutServiceType">{basket.service.type}</p>
            <p className="checkoutServicePrice">${basket.service.price.toFixed(2)}</p>
          </div>
          {basket.addServices.map((addService, index) => (
            <div key={index} className="checkoutAddService">
              <h4 className="checkoutAddServiceName" />
              <p className="checkoutServiceType">{addService.type}</p>
              <p className="checkoutServicePrice">${addService.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div id="checkoutTotalContainer">
          <h4 id="checkoutTotal">Total:</h4>
          <p id="checkoutTotalPrice">${totalCost.toFixed(2)}</p>
        </div>
      </div>
    );
  };

  return (
    <main id="checkoutContainer">
      <section id="checkoutSummaryWrapper">
        <h2 id="checkoutBack" className="bookOnlineServicesBack" onClick={() => setServiceDate(undefined)}>Back</h2>
        <div id="checkoutSummary">
          <h2 id="checkoutTitle">Checkout</h2>
          <strong id="checkoutSubtitle">Review your appointment details, then click 'Book Appointment' to complete appointment</strong>
          {serviceCheckout()}
          <p id="checkoutSurcharge"><strong id="checkoutSurchargeBold">A surcharge fee may be added to all payments made by credit card.</strong> This fee will be due at the time of credit card payment and is non-refundable.</p>
          <input type="text" id="checkoutNote" placeholder="Appointment Note" />
          <span id="noteSpan">Notes area should not be used to request additional service(s).</span>
        </div>
      </section>
      <section id="checkoutCancellation">
        <div id="checkoutCancellationContainer">
          <div id="checkoutCancellationCheckboxContainer">
            <input type="checkbox" id="checkoutCancellationCheckbox" name="checkoutCancellationCheckbox" />
            <svg id="checkoutCancellationCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
            </svg>
          </div>
          <div id="checkoutCancellationTextContainer">
            <label id="checkoutCancellationLabel" htmlFor="checkoutCancellationCheckbox">I Agree to the Cancellation Policy</label>
            <ul id="checkoutCancellationList">
              <li className="checkoutCancellationListItem">We understand that life happens and appointments sometimes must be canceled but we kindly request a 24 hour notice.</li>
              <li className="checkoutCancellationListItem">We will require you to put a credit card on file to book an appointment.</li>
              <li className="checkoutCancellationListItem">Less than 24 hours notice will result in a fee of 50% of the reserved service price.</li>
              <li className="checkoutCancellationListItem">"No call, no show" will likewise be charged 50% of the reserved service price.</li>
              <li className="checkoutCancellationListItem">We respect your time and ask you respect ours. If a guest is more than 15 minutes late, please understand that your appointment will potentially have to be rescheduled and 50% of your service will be charged to your card. This fee does not go to your next service.</li>
              <br />
              <p className="checkoutCancellationListItem">THANK YOU FOR SUPPORTING OUR SMALL BUSINESS!</p>
            </ul>
          </div>
        </div>
        <input type="button" id="checkoutButton" value="Book Appointment" />  
      </section>
    </main>
  );
}
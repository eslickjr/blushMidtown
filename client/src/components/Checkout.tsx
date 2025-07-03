import "../styles/Checkout.css";
import AppointmentI from "types/appointment";
import { useStylists, useServiceTypes, useServices, useAddServices } from "context/BookingDataContext";
import { getServicePrice, getAddServicePrices } from "utils/api/blush/pricingLevel";
import { useEffect, useState } from "react";
import { createAppointment } from "utils/api/blush/appointment";

interface CheckoutProps {
  setServiceDate: (date: Date | undefined) => void;
  appointment: AppointmentI; // Replace 'any' with the actual type of your appointment
  postBook: {
    setBookType: (type: string) => void;
    setServiceType: (serviceTypeId: number) => void;
    setService: (serviceId: number) => void;
    setAddService: (addServiceIds: number[]) => void;
    setStylist: (stylistId: number) => void;
    setAddServicePass: (addServicePass: boolean) => void;
    setServiceDate: (date: Date | undefined) => void;
    setAppointment: (appointment: AppointmentI) => void;
  };
}

export default function Checkout({ setServiceDate, appointment, postBook }: CheckoutProps) {
  const { stylistsContext } = useStylists();
  const { serviceTypesContext } = useServiceTypes();
  const { servicesContext } = useServices();
  const { addServicesContext } = useAddServices();
  const pricingLevelId = stylistsContext.find(stylist => stylist.id === appointment.stylistId)?.pricingLevelId || 0;
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [addServicePrices, setAddServicePrices] = useState<number[]>([]);
  const [stylistInfo, setStylistInfo] = useState<{ name: string; src: string } | null>(null);
  const [ serviceInfo, setServiceInfo ] = useState<{ name: string; type: string } | null>(null);
  const [ addServiceInfo, setAddServiceInfo ] = useState<{ type: string }[]>([]);
  const [serviceTypeInfo, setServiceTypeInfo] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const servicePrice = await getServicePrice(appointment.serviceId, pricingLevelId);
        const addServicePrices = await getAddServicePrices(appointment.addServiceIds ?? [], pricingLevelId);
        setServicePrice(servicePrice);
        setAddServicePrices(addServicePrices || []);
      } catch (error) {
        console.error("Error fetching service prices:", error);
      }
    }

    fetchPrices();
  }, [appointment.serviceId, appointment.addServiceIds, pricingLevelId]);

  useEffect(() => {
    const stylist = stylistsContext.find(stylist => stylist.id === appointment.stylistId);
    if (stylist) {
      setStylistInfo({ name: stylist.name, src: stylist.src });
    }
  }, [appointment.stylistId]);

  useEffect(() => {
    const service = servicesContext.find(service => service.id === appointment.serviceId);
    if (service) {
      setServiceInfo({ name: service.type, type: service.type });
    }
  }, [appointment.serviceId]);

  useEffect(() => {
    const serviceType = serviceTypesContext.find(type => type.id === appointment.serviceTypeId);
    if (serviceType) {
      setServiceTypeInfo({ name: serviceType.name });
    }
  }, [appointment.serviceTypeId]);

  useEffect(() => {
    const addServices = appointment.addServiceIds?.map(addServiceId => {
      const addServiceInfo = addServicesContext.find(service => service.id === addServiceId);
      return addServiceInfo ? { type: addServiceInfo.type } : { type: ""};
    }) ?? [];
    setAddServiceInfo(addServices);
  }, [appointment.addServiceIds]);

  const totalCost = servicePrice + addServicePrices.reduce((total, addServicePrice) => total + addServicePrice, 0);

  const handleBooking = async () => {
    createAppointment(appointment);
    postBook.setBookType("booked");
    postBook.setServiceType(-1);
    postBook.setService(-1);
    postBook.setAddService([]);
    postBook.setStylist(-1);
    postBook.setAddServicePass(false);
    postBook.setServiceDate(undefined);
    postBook.setAppointment({
      clientId: -1,
      serviceTypeId: -1,
      serviceId: -1,
      addServiceIds: [],
      stylistId: -1,
      startTime: new Date(),
      endTime: new Date()
    });
  }


  const serviceCheckout = () => {
    console.log("appointment:", appointment);
    return (
      <div id="checkoutServiceWrapper">
        <div id="checkoutServiceContainer">
          <h3 id="checkoutServiceDate">
            {appointment.startTime?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour:"numeric", minute: "2-digit" })} with&nbsp; 
            <div id="checkoutStylist">
              <img id="checkoutStylistImage" src={stylistInfo?.src} alt={stylistInfo?.name} />
            </div>
          </h3>
          <div id="checkoutService">
            <h4 id="checkoutServiceName">{serviceInfo?.name}</h4>
            <p className="checkoutServiceType">{serviceTypeInfo?.name}</p>
            <p className="checkoutServicePrice">${servicePrice.toFixed(2)}</p>
          </div>
          {addServiceInfo.map((addService, index) => (
            <div key={index} className="checkoutAddService">
              <h4 className="checkoutAddServiceName" />
              <p className="checkoutServiceType">{addService.type}</p>
              <p className="checkoutServicePrice">${addServicePrices[index].toFixed(2)}</p>
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
        <input type="button" id="checkoutButton" value="Book Appointment" onClick={() => handleBooking()}/>  
      </section>
    </main>
  );
}
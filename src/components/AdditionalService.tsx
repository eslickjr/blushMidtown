import "../styles/AdditionalService.css";

import AdditionalServiceI from '../types/addService';
import { BasketAddServiceI, BasketServiceI } from '../types/basket';

import { useState, useEffect, useRef } from 'react';

interface AdditionalServiceProps {
    additionalServices: AdditionalServiceI[];
    addService: BasketAddServiceI[];
    setAddService: (addService: BasketAddServiceI[]) => void;
    setService: (service: BasketServiceI) => void;
    defaultService: BasketServiceI;
    service: BasketServiceI;
    setAddServicePass: (pass: boolean) => void;
}

export default function AdditionalService({ additionalServices, addService, setAddService, setService, service, defaultService, setAddServicePass }: AdditionalServiceProps) {
    const [ addServiceCheck, setAddServiceCheck ] = useState<boolean[]>(Array(additionalServices.length).fill(false));
    const [ disabled, setDisabled ] = useState<boolean[]>(Array(additionalServices.length).fill(false));
    const addServiceRef = useRef<BasketAddServiceI[]>(addService);

    useEffect(() => {
        // const updatedCheck = additionalServices.map((_, index) => {
        //     return addService.some(service => service.type === additionalServices[index].type);
        // });
        // setAddServiceCheck(updatedCheck);
    
        console.log("service type", service.type);
        console.log("addService Match", additionalServices.map(addServiceItem => addServiceItem.match));

        const updatedCheck = additionalServices.map(addServiceItem => {
            return addService.some(serviceCheck => serviceCheck.type === addServiceItem.type);
        });
        setAddServiceCheck(updatedCheck);

        const updatedDisabled = additionalServices.map(addServiceItem =>
            (Array.isArray(addServiceItem.match) && addServiceItem.match.includes(service.type)) ||
            addServiceItem.type === service.type ||
            (Array.isArray(addServiceItem.match) && addServiceItem.match.some(matchType => addServiceRef.current.some(serviceRef => serviceRef.type === matchType)))
        );
        setDisabled(updatedDisabled);
    }, []);

    const handleCheckboxChange = (index: number) => {
        const updatedCheck = [...addServiceCheck];
        updatedCheck[index] = !updatedCheck[index];
        setAddServiceCheck(updatedCheck);

        if (updatedCheck[index]) {
            setAddService([...addService, { type: additionalServices[index].type, price: additionalServices[index].priceBottom }]);
            addServiceRef.current = [...addService, { type: additionalServices[index].type, price: additionalServices[index].priceBottom }];
            const updatedDisabled = additionalServices.map(addServiceItem =>
                (Array.isArray(addServiceItem.match) && addServiceItem.match.includes(service.type)) ||
                addServiceItem.type === service.type ||
                (Array.isArray(addServiceItem.match) && addServiceItem.match.some(matchType => addServiceRef.current.some(serviceRef => serviceRef.type === matchType)))
            );
            setDisabled(updatedDisabled);
        } else {
            setAddService(addService.filter(service => service.type !== additionalServices[index].type));
            addServiceRef.current = addService.filter(service => service.type !== additionalServices[index].type);
            const updatedDisabled = additionalServices.map(addServiceItem =>
                (Array.isArray(addServiceItem.match) && addServiceItem.match.includes(service.type)) ||
                addServiceItem.type === service.type ||
                (Array.isArray(addServiceItem.match) && addServiceItem.match.some(matchType => addServiceRef.current.some(serviceRef => serviceRef.type === matchType)))
            );
            setDisabled(updatedDisabled);
        }

        // const existing = addService.find(service => service.type === addServiceItem.type);
        //                 if (existing) {
        //                     setAddService(addService.filter(service => service.type !== existing.type));
        //                 } else {
        //                     setAddService([...addService, { type: addServiceItem.type, price: addServiceItem.priceBottom }]);
        //                 }
        //             }}
    }

    const addServiceList = () => {
        return (
            <ul id="bookOnlineAddServiceList">
                {additionalServices.map((addServiceItem, index) => (
                    <li className={`bookOnlineAddServiceItem ${disabled[index] ? "addServiceDisabled" : "addServiceEnabled"}`} key={index} onClick={() => {if(!disabled[index]) handleCheckboxChange(index);}}>
                        <h3 className="bookOnlineAddServiceItemHeader">{addServiceItem.type}</h3>
                        <p className="bookOnlineAddServiceItemPrice">Price: ${addServiceItem.priceBottom}</p>
                        <div className="addServiceCheckboxContainer">
                            <input type="checkbox" checked={addServiceCheck[index]} className="addServiceCheckbox" name={`addServiceCheckbox${index}`} />
                            <svg className="addServiceCheckboxCheck" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </div>
                        <div id="bookOnlineAddServiceItemOverlay" className={disabled[index] ? "overlayActive" : ""} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div id="bookOnlineAddService" className="bookOnlineServicesContainer">
            <h2 id="bookOnlineAddServiceBack" className="bookOnlineServicesBack" onClick={() => {setAddService([]); setService(defaultService);}}>Back</h2>
            <h2 id="bookOnlineAddServiceHeader" className="bookOnlineServicesHeader">Add Addtional Services?</h2>
            {addServiceList()}
            <h2 id="bookOnlineAddServiceSkip" className="bookOnlineServicesSkip" onClick={() => setAddServicePass(true)}>{addService.length === 0 ? "Skip" : "Continue"}</h2>
        </div>
    );
}
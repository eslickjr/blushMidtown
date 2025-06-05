import { BasketStylistI } from "../types/basket";

interface StylistProps {
    setAddServicePass: (pass: boolean) => void; // Function to set the selected service
    setStylist: (stylist: BasketStylistI) => void; // Function to set the selected stylist
    stylistsData: BasketStylistI[]; // List of stylists
}

export default function Stylist({ setAddServicePass, setStylist, stylistsData }: StylistProps) {
    const stylistList = () => {
        return (
            <ul id="bookOnlineStylistList">
                {stylistsData.map((stylist, index) => (
                    <li className="bookOnlineStylistItem" key={index} onClick={() => {setStylist(stylistsData[index])}}>
                        <div className="bookOnlineStylistImageCon">
                            <img className="bookOnlineStylistImage" src={stylist.src} alt={stylist.name} />
                            <div className="bookOnlineStylistImageOverlay" />
                        </div>
                        <h2 className="bookOnlineStylistHeader">{stylist.name}</h2>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div id="bookOnlineServicesStylist" className="bookOnlineServicesContainer">
            <h2 id="bookOnlineServicesStylistBack" className="bookOnlineServicesBack" onClick={() => setAddServicePass(false)}>Back</h2>
            <h2 id="bookOnlineServicesStylistHeader" className="bookOnlineServicesHeader">Select a Stylist</h2>
            {stylistList()}
            <div className="bookOnlineStylistItem" key={stylistsData.length} onClick={() => {setStylist(stylistsData[Math.floor(Math.random() * stylistsData.length)])}}>
                <div className="bookOnlineStylistImageCon">
                    <div id="bookOnlineRandomStylist" className="bookOnlineStylistImage">?</div>
                    <div className="bookOnlineStylistImageOverlay" />
                </div>
                <h2 className="bookOnlineStylistHeader">Random</h2>
            </div>
        </div>
    );
}
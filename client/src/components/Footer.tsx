import "../styles/Footer.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Footer(bloomOut: { bloomOut: () => void }) {
    const navigate = useNavigate();

    useEffect(() => {
        const img1 = new Image();
        img1.src = "../assets/logos/GGBC%20_Logo_Gold2.png";
    }, []);

    const reRoute = (path: string) => {
        bloomOut.bloomOut();
        setTimeout(() => {
            navigate(path);
        }, 500); // Adjust the timeout duration as needed
    };

    return (
        <footer id="theFooter" className="footer">
            <div id="footerInfoContainer">
                <div id="footerSocialMedias">
                    <div id="footerLogo" onClick={() => reRoute("/")}/>
                    <div className="footer-social">
                        <ul className="footer-social-list">
                            <li className="footer-social-item">
                                <a className="footer-social-link" href="https://www.google.com/maps/place/51+Salters+Rd,+Greenville,+SC+29607" target="_blank" rel="noopener noreferrer">
                                    <img alt="Google Maps" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/22db839dd0a94a1c9dd91dafe2617dc1.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22db839dd0a94a1c9dd91dafe2617dc1.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                                </a>
                            </li>
                            <li className="footer-social-item">
                                <a className="footer-social-link" href="https://www.facebook.com/blushmidtowngreenvillesalon" target="_blank" rel="noopener noreferrer">
                                    <img alt="Facebook" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/23fd2a2be53141ed810f4d3dcdcd01fa.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                                </a>
                            </li>
                            <li className="footer-social-item">
                                <a className="footer-social-link" href="https://www.instagram.com/blushmidtowngreenvillesalon/" target="_blank" rel="noopener noreferrer">
                                    <img alt="Instagram" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/81af6121f84c41a5b4391d7d37fce12a.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="footerContact">
                    {/* <p id="footerInfo">Contact Info</p> */}
                    <div id="footerAddressContainer" className="footerInfoContainer">
                        {/* <svg id="footerLocation" className="svg-inline--fa fa-location-dot footerInfoIcon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"></path></svg> */}
                        <a id="footerAddress" className="footerInfo" href="https://www.google.com/maps?q=51+Salters+Rd,+Greenville,+SC+29607" target="_blank" rel="noopener noreferrer">51 Salters Rd, Greenville, SC 29607</a>
                    </div>
                    <div id="footerPhoneContainer" className="footerInfoContainer">
                        {/* <svg className="svg-inline--fa fa-phone footerInfoIcon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg> */}
                        <a id="footerPhone" className="footerInfo" href="tel:8642637864">864-263-7864</a>
                    </div>
                    <div id="footerEmailContainer" className="footerInfoContainer">
                        {/* <svg className="svg-inline--fa fa-envelope footerInfoIcon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"></path></svg> */}
                        <a id="footerEmail" className="footerInfo" href="mailto:Info@blushmidtownsalon.com">Info@blushmidtownsalon.com</a>
                    </div>
                </div>
            </div>
            <p id="developerInfo">
                Blush Midtown Salon Greenville 2025 Design Developed by&nbsp;
                <a id="devLink" href="https://joshua-eslick.com/" target="_blank" rel="noopener noreferrer">Joshua Eslick</a>
            </p>
        </footer>
    );
}
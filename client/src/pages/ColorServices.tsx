import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import "../styles/ColorServices.css";

import blonde from "../assets/colorServices/blonde.avif";
import blonde2 from "../assets/colorServices/blonde2.avif";
import brunette from "../assets/colorServices/brunette.avif";
import brunette2 from "../assets/colorServices/brunette2.avif";
import grey from "../assets/colorServices/grey.avif";
import neonRed from "../assets/colorServices/neon_red.avif";

export default function ColorServices() {
    const [onScreenIndex, setOnScreenIndex] = useState(0);
    const [mobile, setMobile] = useState(window.innerWidth <= 1058);
    const colorIndex = useRef(0);
    const visibleCount = 4;
    const cycleDuration = 20000; // 8 seconds
    const [colorsOnScreen, setColorsOnScreen] = useState(Array.from({length: visibleCount + 1}, (_, i) => i));

    const colorImages = [ blonde, blonde2, brunette, brunette2, grey, neonRed ];

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 1058);
        };

        const colorInterval = setInterval(() => {
            setOnScreenIndex(prev => {
                const newOnScreen = (prev + 1) % (visibleCount + 1);

                setColorsOnScreen(prevScreen => {
                    const updated = [...prevScreen];

                    colorIndex.current = (colorIndex.current + 1) % colorImages.length;
                    updated[prev] = (colorIndex.current + visibleCount) % colorImages.length;

                    return updated;
                });
                return newOnScreen;
            });
        }, cycleDuration);

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(colorInterval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const colorCarousel = () => {
        return colorsOnScreen.map((data, index) => {
            return (
                <div key={index} className={`colorServiceImageContainer ${index >= onScreenIndex && index < onScreenIndex + visibleCount + 1 ? 'colorOnScreen' : 'colorOffScreen'} ${onScreenIndex + visibleCount + 1 === index ? "colorUpNext" : ""}`}>
                    <img src={colorImages[data]} alt={`Color Service ${data + 1}`} className="colorServiceImage" />
                </div>
            )
        });
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const yOffset = mobile ? window.innerWidth * 0.07 + 80 : 80; // Adjust offset for mobile
            const y = el.getBoundingClientRect().top + window.scrollY - yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }

    return (
        <main>
            <section id="colorServiceCarouselSection">
                <div id="colorServiceCarouselWrapper">
                    <h1 id="colorServiceCarouselHeader">Best Hair Color Services in Greenville</h1>
                    <Link to="/book-online" className="colorServiceCarouselLink">Schedule an Appointment</Link>
                    <div id="colorServiceCarouselContainer">
                        <div id="colorServiceCarousel1" className={`colorServiceCarousel ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
                            {colorCarousel()}
                        </div>
                        <div id="colorServiceCarousel2" className={`colorServiceCarousel ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
                            <div key={visibleCount + 1} className={`colorServiceImageContainer ${visibleCount >= onScreenIndex && visibleCount < onScreenIndex + visibleCount + 1 ? 'colorOnScreen' : 'colorOffScreen'} ${onScreenIndex + visibleCount + 1 === visibleCount ? "colorUpNext" : ""}`}>
                                <img src={colorImages[colorsOnScreen[visibleCount]]} alt={`Color Service ${visibleCount + 1}`} className="colorServiceImage" />
                            </div>
                        </div>
                        <div id="colorServiceCarousel3" className={`colorServiceCarousel ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
                            {colorCarousel()}
                        </div>
                    </div>
                </div>
            </section>
            <section id="colorServiceListWrapper">
                <div id="colorServiceListContainer">
                    <h4 className="colorServiceListHeader">Blush Midtown Greenville Salon has the best hair colorists in Greenville, SC. We offers everything from skillful gray blending and beautiful balayage to root touch-ups and dimensional all over color.</h4>
                    <h4 className="colorServiceListHeader">Whether you’re looking for a natural lived-in look or a vibrant eye-catching shade, we have the experience and artistic eye to achieve your desired hair color!</h4>
                    <div id="colorServiceListLinksContainer">
                        <a href="#colorServiceItemGrayBlending" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemGrayBlending")}>Gray Blending</a>
                        <a href="#colorServiceItemBalayage" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemBalayage")}>Balayage</a>
                        <a href="#colorServiceItemAllOverColor" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemAllOverColor")}>All Over Color</a>
                        <a href="#colorServiceItemExpress" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemExpress")}>Express Color</a>
                        <a href="#colorServiceItemGlaze" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemGlaze")}>Glaze</a>
                        <a href="#colorServiceItemVivid" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemVivid")}>Vivid Color</a>
                        <a href="#colorServiceItemCorrective" className="colorServiceListLink" onClick={(e) => handleScroll(e, "colorServiceItemCorrective")}>Corrective</a>
                    </div>
                    <ul id="colorServiceList">
                        <li id="colorServiceItemGrayBlending" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Gray Blending</h2>
                            <span className="colorServiceItemSpan">*Color service includes a haircut</span>
                            <p className="colorServiceItemDesc firstP">Gray blending is the process of blending your current color with incoming grays so there is no line of demarcation. This hair coloring service gives your hair a natural look and is a great lower maintenance option for clients who don't want to get root retouches every 8 weeks. The cost of our gray blending services start at $225.​</p>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Grey Transformation</h2>
                            <span className="colorServiceItemSpan">*Color service includes a haircut</span>
                            <span className="colorServiceItemSpan">*Please note you MUST book a consultation for Grey Transformations</span>
                            <p className="colorServiceItemDesc firstP">Are you finally ready to say GOOD BYE to coloring your roots every 4 weeks? A Grey transformation might be a good fit for you. Our goal is to transition you to your natural grey hair in one visit. Our grey transformation service is a great option for clients who want to embrace their greys and switch from a more high maintenance root retouch so they no longer need to come into the salon every 4-6 weeks. Our grey transformation services range from $125-$150 an hour.​</p>
                            <li className="colorServiceItemDesc bulletDesc">You must book a free color consultation first with one of our Grey Transformation Specialists.</li>
                            <li className="colorServiceItemDesc bulletDesc">This hair coloring service can take up to 8 hours and is usually achieved in one or two sessions. It is maintained with a toner every 6-8 weeks and possible highlight touches as needed until the original color grows out and can be cut off.</li>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemBalayage" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Balayage Services</h2>
                            <span className="colorServiceItemSpan">*Color service includes a haircut</span>
                            <p className="colorServiceItemDesc firstP">
                                With balayage, our experienced Greenville colorists hand-paint highlights into your hair for a lived-in, natural look. This service gives your color a soft grow out and can last up to six months, which makes it a great option for someone who doesn't want to return to the hair salon every couple of weeks. This service starts at $225.
                                <br /><br />
                                Balayage can be done on blondes or brunettes. Clients with other hair colors should contact our hair salon about other hair color services that can be used to achieve your desired look.
                            </p>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemAllOverColor" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">All Over Color Services</h2>
                            <span className="colorServiceItemSpan">*Color service includes a haircut</span>
                            <p className="colorServiceItemDesc firstP">
                                All over color is a hair coloring service that changes the overall color of your hair, such as blonde to brunette or light brunette to a darker shade. The final result can range from super dimensional to beautifully blended, depending on your desired look.
                                <br /><br />
                                This service is a great option for someone who wants to make an all over change to their hair color. However, it should be noted that all over color is not a lightening service and is usually not an option for someone looking to go a shade lighter than they already are. Our all over color starts at $150. The cost of this hair coloring service depends on your hair's length and density, as well as the desired look.
                            </p>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemExpress" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Express Color</h2>
                            <p className="colorServiceItemDesc firstP">We know you’re busy, and we take that into account with our express color service. Express color is a root touch-up service for our existing clients, which makes it a great option for anyone who wants to touch up their roots without spending more than an hour in the salon. Express color services are $65.</p>
                            <li className="colorServiceItemDesc boldDesc">Because of the time constraints of this service, express color does not include a cut or style.</li>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemGlaze" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Glaze Color Services</h2>
                            <span className="colorServiceItemSpan">*Color service includes a haircut</span>
                            <p className="colorServiceItemDesc firstP">Hair glaze is a non-permanent technique that can tone your color and add shine to your hair. This hair color treatment can also be a maintenance appointment for blondes, gray blending, or gray transformation clients. Glaze hair color treatments start at $90.</p>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemVivid" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Vivid Color Services</h2>
                            <span className="colorServiceItemSpan">*Book a consultation first</span>
                            <p className="colorServiceItemDesc firstP">Vivid colors are perfect for a wild child, and we’re here for it! Bring us your inspiration or let us use our creativity to guide you. Our hair colorists know what it takes to achieve stunning bright hair color.</p>
                            <li className="colorServiceItemDesc bulletDesc">These sessions can look different for everyone depending on the desired look, so vivid color appointments can take anywhere from 4-10 hours depending on the color you want and the length and density of your hair. We require a free color consultation be booked first so we can assess your individual situation and discuss expectations, budget, and timing.</li>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                        <li id="colorServiceItemCorrective" className="colorServiceItem">
                            <h2 className="colorServiceItemHeader">Corrective Color Services</h2>
                            <span className="colorServiceItemSpan">*Book a consultation first</span>
                            <p className="colorServiceItemDesc firstP">Corrective color services repair any issues you may have from previous hair coloring experiences. Things happen, and we are here to help you get your hair back to where you want it to be. Let our hair coloring experts take you from “Oh my!” to “Oh WOW!” with skillful corrective color. Corrective color services start at $125 per hour.</p>
                            <li className="colorServiceItemDesc bulletDesc">Corrective color can be very tedious and time consuming, so expect anywhere from 4-10 hours depending on the project at hand. We require a free color consultation be booked first so we can assess your individual situation and discuss expectations, budget, and timing.</li>
                            <Link to="/bookOnline" className="colorServiceItemLink">BOOK NOW</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
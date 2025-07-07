import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/Home.css";
import landingImageLogo from "../assets/logo/Blush_Landing.avif";
// import bestOfSC from "../assets/logo/BestofSC.png";
import backgroundImage from "../assets/background.avif";
import extensions from "../assets/services/extensions.avif";
import highlights from "../assets/services/highlights.avif";
import hairColor from "../assets/services/hair_color.avif";
import hairCuts from "../assets/services/hair_cut.avif";
import makeup from "../assets/services/makeup.avif";
import specialOccasion from "../assets/services/special_occasion.avif";
import stylingKatie from "../assets/styling_katie.avif";
import ad from "../assets/ad.avif";

export default function Home() {
    const [mobile, setMobile] = useState<boolean>(window.innerWidth < 980);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 980);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main>
            <section id="home">
                {mobile ? 
                    <div id="homeImageWrapper">
                        {/* <img id="homeImageLogo" src={landingImageLogo} alt="Home" /> */}
                        <div id="homeImage"/>
                        <Link id="homeImageButton" to="/book-online">SCHEDULE AN APPOINTMENT</Link>
                    </div>
                :
                    <div id="homeImage">
                        <img id="homeImageLogo" src={landingImageLogo} alt="Home" />
                        <Link id="homeImageButton" to="/book-online">SCHEDULE AN APPOINTMENT</Link>
                    </div>
                }
                <div id="homeText">
                    <a id="homePhone" className="homeInfo" href="tel:864-263-7864">864-263-7864</a>
                    <a id="homeEmail" className="homeInfo" href="mailto:Info@BlushMidtownSalon.com">Info@BlushMidtownSalon.com</a>
                    <a id="homeAddress" className="homeInfo" href="https://www.google.com/maps/place/51+Salters+Rd,+Greenville,+SC+29607" target="_blank" rel="noopener noreferrer">51 Salters Rd<br />Greenville, SC 29607</a>
                </div>
            </section>
            <section id="homeVote">
                {/* <div id="homeVoteWrapper">
                    <div id="homeVoteContainer">
                        <a id="homeVoteLink" href="https://guidetosouthcarolina.com/greenville/beauty-spa/blush-hair-studio-spa?from=badge" target="_blank" rel="noopener noreferrer">
                            <img id="homeVoteImage" src={bestOfSC} alt="Blush Hair Studio & Spa" />
                        </a>
                        <a id="homeVoteButton" href="https://guidetosouthcarolina.com/greenville/beauty-spa/blush-hair-studio-spa?from=badge" target="_blank" rel="noopener noreferrer">VOTE HERE</a>
                    </div>
                    <div id="homeVoteInfo">
                        <h1 id="homeVoteBlush" className="homeVoteHeader homeVoteText">Vote for Blush for</h1>
                        <h1 id="homeVoteBestOf" className="homeVoteHeader homeVoteText">"Best of South Carolina"</h1>
                        <p id="homeVoteText" className="homeVoteText">We would be honored to have your support! Vote for Blush Hair Studio Salon as the Best of South Carolina and help us continue to bring luxury, beauty, and precision to Greenville. <br/>Your vote means the world to us!</p>
                    </div>
                </div> */}
                <img id="homeVoteAd" src={ad} alt="Vote for Blush" />
                <a id="homeVoteLink" href="https://www.facebook.com/share/1FrGq58sm2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">RSVP</a>
            </section>
            <section id="homeWelcome">
                <img id="homeWelcomeBackground" src={backgroundImage} alt="Background" />
                <div id="homeWelcomeContainer">
                    <h1 id="homeWelcomeHeader">Welcome to Blush Midtown Greenville Salon</h1>
                    <p id="homeWelcomeText">
                        Looking for a high-end hair salon in Greenville, SC, that’s elegant without the attitude? At Blush Midtown, we blend luxury with exceptional service in a welcoming, judgment-free space. From your first consultation to the final style, your experience is our priority.
                        <br/>
                        Whether you’re booking highlights, custom color, extensions, or professional makeup, our talented team is here to help you look and feel your absolute best.</p>
                    <div id="homeWelcomeButtonsContainer">
                        <a className="homeWelcomeButton" href="tel:864-232-5884">CALL US</a>
                        <a className="homeWelcomeButton" href="mailto:blushmidtown@gmail.com">EMAIL US</a>
                    </div>
                </div>
            </section>
            <section id="homeServices">
                <h1 id="homeServicesHeader">Overview of Salon Services</h1>
                <div id="homeServicesWrapper">
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={extensions} alt="Hair Extensions" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Hair Extensions</h2>
                            <p className="homeServicesText">Ready for length, volume, or a full transformation? At Blush Midtown Greenville Salon, we offer premium hair extension services tailored to your hair goals and lifestyle. Whether you're looking to enhance your everyday look or create something show-stopping for a special occasion, our certified extension specialists use high-quality methods to ensure seamless, natural-looking results. You will need to book a consultation first to choose the color and length as well as to discuss the ins and outs of caring for extensions. </p>
                        </div>
                    </div>
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={highlights} alt="Highlights & Balayage" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Highlights & Balayage</h2>
                            <p className="homeServicesText">
                                Illuminate your look with hand-crafted highlights or balayage at one of Greenville’s top salons. Whether you prefer a sun-kissed glow or bold dimension, our expert colorists use premium products and precise techniques to deliver flawless results.
                                <br/>
                                All lightening services include a cut and style for a complete transformation.
                            </p>
                        </div>
                    </div>
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={hairColor} alt="Expert Hair Color" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Expert Hair Color</h2>
                            <p className="homeServicesText">
                                From soft, lived-in color to full blonding, vivids and custom gray coverage, our Greenville hair color specialists offer tailored solutions for every shade and style. We also offer corrective color for those in need of a color rescue—trust us to get it right.
                                <br/>
                                We take the time to understand your goals, so your color always feels like you.
                            </p>
                        </div>
                    </div>
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={hairCuts} alt="Hair Cuts" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Hair Cuts</h2>
                            <p className="homeServicesText">
                                A great haircut is the foundation of any style—and our stylists deliver nothing less than excellence. We specialize in precision cutting, long layers, curly textures, and more.
                                <br/>
                                Men’s and women’s haircuts are available, with clear pricing and expert care. Appointments are encouraged, but walk-ins are welcome.
                            </p>
                        </div>
                    </div>
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={specialOccasion} alt="Special Occasion Hair Styling" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Special Occasion Hair Styling</h2>
                            <p className="homeServicesText">
                                Get red carpet–ready with luxury special occasion hair styling. Whether you're attending a wedding, gala, prom, or formal event, our expert stylists craft polished, long-lasting styles designed to elevate your entire look. From soft waves to sleek updos, we’ll tailor your style to complement your features, outfit, and the vibe of your event.
                                <br/>
                                We specialize in bridal hairstyling in Greenville, SC, and offer a complimentary consultation for brides to ensure every detail is planned to perfection. Let us bring your dream look to life for your big day—or any day worth celebrating.
                            </p>
                        </div>
                    </div>
                    <div className="homeServicesContainer">
                        <img className="homeServicesImage" src={makeup} alt="Professional Makeup Services" />
                        <div className="homeServicesInfoContainer">
                            <h2 className="homeServicesHeader">Professional Makeup Services</h2>
                            <p className="homeServicesText">
                                Make every moment picture-perfect with our luxury makeup services. Whether you're getting ready for a wedding, photoshoot, formal event, or party, our licensed makeup artists deliver radiant, camera-ready looks that last. From natural beauty to full glam, we customize every detail to suit your skin tone, style, and occasion.
                                <br/>
                                We specialize in bridal and special occasion makeup, offering personalized consultations to help you feel confident and flawless from your first photo to your final dance.
                            </p>
                        </div>
                    </div>
                </div>
                <div id="homeServicesLinkContainer">
                    <Link id="homeServicesLink" to="/service-menu">Salon Services & Pricing</Link>
                </div>
            </section>
            <section id="homeClientWords">
                <div id="homeClientWordsWrapper">
                    <img id="homeClientWordsImage" src={stylingKatie} alt="Styling Katie" />
                    <div id="homeClientWordsContainer">
                        <h1 id="homeClientWordsHeader">Words From Our Fabulous Clients</h1>
                        <p id="homeClientWordsText">It makes us so happy to see the number of positive reviews we get on a regular basis. The number of referrals and repeat customers is also proof that we are performing an outstanding service for our clients.</p>
                        <a id="homeClientWordsLink" href="https://g.page/r/CZAzlt-g-VzzEBM/review" target="_blank" rel="noopener noreferrer">Leave us a Google Review!</a>
                    </div>
                </div>
            </section>
            <section id="homeQuotes">
                <div id="homeQuotesContainerBrenda" className="homeQuotesContainer">
                    <svg className="homeQuotesImage" preserveAspectRatio="xMidYMid meet" data-bbox="48.8 51 102.4 98.1" xmlns="http://www.w3.org/2000/svg" viewBox="48.8 51 102.4 98.1" role="presentation" aria-hidden="true" aria-label=""><g><path d="M89.9 51H51.6c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.2-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8H54.4V56.6h32.7v21z"></path><path d="M148.4 51h-38.3c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.3-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8h-18.1V56.6h32.7v21z"></path></g></svg>
                    <p className="homeQuotesText">
                        Extremely skilled stylist and color/cut specialist. Courtney has got a gift for listening to your wishes, suggesting ideas then pulling it all together to make you come away feeling like your best self. Highly recommend this lovely salon! Thank you!
                        <br /><br />
                        Brenda Box
                    </p>
                </div>
                <div id="homeQuotesContainerJamie" className="homeQuotesContainer">
                    <svg className="homeQuotesImage" preserveAspectRatio="xMidYMid meet" data-bbox="48.8 51 102.4 98.1" xmlns="http://www.w3.org/2000/svg" viewBox="48.8 51 102.4 98.1" role="presentation" aria-hidden="true" aria-label=""><g><path d="M89.9 51H51.6c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.2-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8H54.4V56.6h32.7v21z"></path><path d="M148.4 51h-38.3c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.3-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8h-18.1V56.6h32.7v21z"></path></g></svg>
                    <p className="homeQuotesText">
                        I've been seeing Jen for a few years now. She's an excellent hair stylist and I absolutely love the vibe of her salon. The other stylists have also been great. My son has seen Sally, and she was great with him. Courtney also does a fabulous job with haircuts!
                        <br /><br />
                        Jamie Jo
                    </p>
                </div>
                <div id="homeQuotesContainerChristy" className="homeQuotesContainer">
                    <svg className="homeQuotesImage" preserveAspectRatio="xMidYMid meet" data-bbox="48.8 51 102.4 98.1" xmlns="http://www.w3.org/2000/svg" viewBox="48.8 51 102.4 98.1" role="presentation" aria-hidden="true" aria-label=""><g><path d="M89.9 51H51.6c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.2-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8H54.4V56.6h32.7v21z"></path><path d="M148.4 51h-38.3c-1.5 0-2.8 1.2-2.8 2.8v38.3c0 1.5 1.2 2.8 2.8 2.8h18.1c-.2 4.3-.9 9.1-3.2 15.2-2.3 5.9-11.1 13.1-16.3 16.2-.9.5-1.4 1.4-1.4 2.4v17.6c0 .9.5 1.8 1.3 2.3.5.3 1 .5 1.5.5.4 0 .8-.1 1.1-.2 9.1-4 16.7-9.4 22.6-15.9 5.8-6.5 10.2-13.8 13.1-21.6 2.9-7.8 4.3-19.1 4.3-33.7V53.8c0-1.5-1.3-2.8-2.8-2.8zm-2.8 26.6c0 13.9-1.3 24.6-4 31.8-2.6 7.1-6.7 13.8-12 19.8-4.5 5-10.1 9.3-16.7 12.7v-11.6c4.7-3 14.3-10.5 17.3-18.1 3.2-8.3 3.6-14.7 3.6-20 0-1.5-1.2-2.8-2.8-2.8h-18.1V56.6h32.7v21z"></path></g></svg>
                    <p className="homeQuotesText">
                        Savannah is wonderful! She is helping me transition to my natural gray, while creating a beautiful blending color along the way. She has also given me a fun cut to go along with the new evolving look. I couldn't be happier!!
                        <br /><br />
                        Christy
                    </p>
                </div>
            </section>
            <section id="homeFollowUs">
                <h1 id="homeFollowUsHeader">
                    Follow us on Instagram&nbsp;
                    <a id="homeFollowUsLink" href="https://www.instagram.com/blushmidtowngreenvillesalon/" target="_blank" rel="noopener noreferrer">@blushhairstudio_greenville</a>
                </h1>
                <div>

                </div>
            </section>
        </main>
    );
}
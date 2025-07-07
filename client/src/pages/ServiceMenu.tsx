

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import "../styles/ServiceMenu.css"; // Assuming you have a CSS file for styling

import extensions from "../assets/serviceMenu/extensions.avif";
import hairCuts from "../assets/serviceMenu/hair_cuts.avif";
import colorServices from "../assets/serviceMenu/color_services.avif";
import lighteningServices from "../assets/serviceMenu/lightening_services.avif";
import stylingServices from "../assets/serviceMenu/styling_services.avif";
import bridal from "../assets/serviceMenu/bridal.avif";
import waxing from "../assets/serviceMenu/waxing.avif";

export default function ServiceMenu() {
    const [mobile, setMobile] = useState(window.innerWidth <= 1058);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 1058);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <main id="serviceMenu">
            <Helmet>
                <title>Complete Service Menu | Blush Midtown Greenville</title>
                <meta name="description" content="Explore the full range of hair and beauty services offered at Blush Midtown. From cuts and color to treatments, find what suits your style." />
            </Helmet>
            <section id="serviceMenuWelcome">
                <h1 id="serviceMenuWelcomeHeader">Service Menu</h1>
                <h3 id="serviceMenuWelcomeText">Not sure what service to book? Click the link below and we will be happy to help!</h3>
                <a id="serviceMenuWelcomeLink" className="serviceMenuLink" href="mailto:info@blushmidtownsalon.com">HELP!</a>
            </section>
            <section id="serviceMenuServices">
                <div id="serviceMenuExtensionsContainer" className="serviceMenuContainer">
                    <div id="serviceMenuExtensionsImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuExtensionsImg" className="serviceMenuImg" src={extensions} alt="Hair Extensions" />
                    </div>
                    <div id="serviceMenuExtensionsInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuExtensionsInfo" className="serviceMenuInfo">
                            <div id="serviceMenuExtensionsHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuExtensionsHeader" className="serviceMenuHeader">Hair Extension</h2>
                                <Link id="serviceMenuExtensionsLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuExtensionsList" className="serviceMenuList">
                                <li className="serviceMenuExtensionsListItem serviceMenuListItem">$125 per row to install</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuHairCutsContainer" className="serviceMenuContainer">
                    <div id="serviceMenuHairCutsImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuHairCutsImg" className="serviceMenuImg" src={hairCuts} alt="Hair Cuts" />
                    </div>
                    <div id="serviceMenuHairCutsInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuHairCutsInfo" className="serviceMenuInfo">
                            <div id="serviceMenuHairCutsHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuHairCutsHeader" className="serviceMenuHeader">Hair Cuts</h2>
                                <Link id="serviceMenuHairCutsLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuHairCutsList" className="serviceMenuList">
                                <li className="serviceMenuHairCutsListItem serviceMenuListItem">Women's classic cut  $65+ includes wash, cut and style</li>
                                <li className="serviceMenuHairCutsListItem serviceMenuListItem">
                                    Women's express cut  $45+ 
                                    <br />
                                    Can be done wet or dry​
                                    <br />
                                    <strong>Does not include a style</strong>
                                </li>
                                <li className="serviceMenuHairCutsListItem serviceMenuListItem">
                                    Men's cut $30+
                                    <br />
                                    <strong>price will vary depending on stylist and desired look</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuColorContainer" className="serviceMenuContainer">
                    <div id="serviceMenuColorImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuColorImg" className="serviceMenuImg" src={colorServices} alt="Color Services" />
                    </div>
                    <div id="serviceMenuColorInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuColorInfo" className="serviceMenuInfo">
                            <div id="serviceMenuColorHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuColorHeader" className="serviceMenuHeader">Color Services</h2>
                                <Link id="serviceMenuColorLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuColorList" className="serviceMenuList">
                                <strong className="serviceMenuColorListItem serviceMenuListItem serviceMenuStrongItem">
                                    <strong>All color services include a haircut except express color</strong>
                                    <br />
                                    Root touch $120+ includes haircut and style
                                </strong>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    All over color (root to tip)  $150+ <strong>includes haircut and style</strong>
                                </li>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    Express color  $85+ <strong>does not include cut and style</strong>
                                </li>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    Glaze  $100 <strong>includes haircut and style</strong>
                                </li>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    Vivid color $100 per hour <strong>Please book a color consultation first</strong>
                                </li>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    Grey Transformations $125-$150 per hour
                                    <br />
                                    <strong>Please book a grey transformation consultation first</strong>
                                </li>
                                <li className="serviceMenuColorListItem serviceMenuListItem">
                                    Corrective color $125-$150 per hour
                                    <br />
                                    <strong>Please book a color consultation first</strong>
                                    <br />
                                    <strong>Price will vary depending on stylist and desired look</strong>
                                </li>
                            </ul>
                            <Link id="serviceMenuColorServicesLink" to="/color-services">Explore Color Services</Link>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuLighteningContainer" className="serviceMenuContainer">
                    <div id="serviceMenuLighteningImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuLighteningImg" className="serviceMenuImg" src={lighteningServices} alt="Lightening Services" />
                    </div>
                    <div id="serviceMenuLighteningInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuLighteningInfo" className="serviceMenuInfo">
                            <div id="serviceMenuLighteningHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuLighteningHeader" className="serviceMenuHeader">Lightening Services</h2>
                                <Link id="serviceMenuLighteningLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuLighteningList" className="serviceMenuList">
                                <li className="serviceMenuLighteningListItem serviceMenuListItem">Highlights  $185+</li>
                                <li className="serviceMenuLighteningListItem serviceMenuListItem">
                                    Balayage / Lived in Color $225+ ​
                                    <br />
                                    <strong>Prices include cut and style</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuStylingContainer" className="serviceMenuContainer">
                    <div id="serviceMenuStylingImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuStylingImg" className="serviceMenuImg" src={stylingServices} alt="Styling Services" />
                    </div>
                    <div id="serviceMenuStylingInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuStylingInfo" className="serviceMenuInfo">
                            <div id="serviceMenuStylingHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuStylingHeader" className="serviceMenuHeader">Styling Services</h2>
                                <Link id="serviceMenuStylingLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuStylingList" className="serviceMenuList">
                                <li className="serviceMenuStylingListItem serviceMenuListItem">
                                    Styling/Blowout $50+
                                    <br />
                                    <strong>Includes a relaxing scalp massage and an expert blowout</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuBridalContainer" className="serviceMenuContainer">
                    <div id="serviceMenuBridalImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuBridalImg" className="serviceMenuImg" src={bridal} alt="Bridal and Special Occasion Hair & Makeup" />
                    </div>
                    <div id="serviceMenuBridalInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuBridalInfo" className="serviceMenuInfo">
                            <div id="serviceMenuBridalHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuBridalHeader" className="serviceMenuHeader">
                                    Bridal and Special
                                    {!mobile && <br />}
                                    Occasion Hair & Makeup
                                </h2>
                                <Link id="serviceMenuBridalLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuBridalList" className="serviceMenuList">
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Bridal Consultation Free</li>
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Bridal Makeup $150+</li>
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Bridal Hair  $150+</li>
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Bridesmaid Makeup  $75+</li>
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Special Occasion Hairstyles $75+</li>
                                <li className="serviceMenuBridalListItem serviceMenuListItem">Hair and Makeup  $150+</li>
                            </ul>
                            <strong className="serviceMenuBridalListItem serviceMenuListItem serviceMenuStrongListItem">Please call the salon at 864-263-7864 or email at info@blushhairstudiospa.com for all questions</strong>
                        </div>
                    </div>
                </div>
                <div id="serviceMenuWaxingContainer" className="serviceMenuContainer">
                    <div id="serviceMenuWaxingImgCon" className="serviceMenuImgCon">
                        <img id="serviceMenuWaxingImg" className="serviceMenuImg" src={waxing} alt="Waxing and Brow Tint" />
                    </div>
                    <div id="serviceMenuWaxingInfoCon" className="serviceMenuInfoCon">
                        <div id="serviceMenuWaxingInfo" className="serviceMenuInfo">
                            <div id="serviceMenuWaxingHeaderCon" className="serviceMenuHeaderCon">
                                <h2 id="serviceMenuWaxingHeader" className="serviceMenuHeader">Waxing and Brow Tint</h2>
                                <Link id="serviceMenuWaxingLink" className="serviceMenuLink" to="/book-online">BOOK NOW</Link>
                            </div>
                            <ul id="serviceMenuWaxingList" className="serviceMenuList">
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Brow, Lip and Chin Wax $50</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Brow and Lip Wax $30</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Brow Wax $15</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Brow Tint $20</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Brow Wax and Tint $35</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Chin Wax $15</li>
                                <li className="serviceMenuWaxingListItem serviceMenuListItem">Arm Wax $45</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
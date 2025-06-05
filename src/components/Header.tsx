import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/Header.css";
import blushLogo from "../assets/logo/BLUSH_LogoCream.avif";
import blushShort from "../assets/logo/B.jpg";

export default function Header(bloomOut: { bloomOut: () => void }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight);
  const [logoStyle, setLogoStyle] = useState(window.innerWidth >= 1511 ? "navLogoLong" : "navLogoShort");
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= window.innerHeight);
      setLogoStyle(window.innerWidth >= 1511 ? "navLogoLong" : "navLogoShort");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reRoute = (path: string) => {
    bloomOut.bloomOut();
    setTimeout(() => {
      navigate(path);
    }, 500); // Adjust the timeout duration as needed
  };

  // const handleExpand = () => {
  //   setNavAnimation("expanding");
  //   setTimeout(() => {
  //     setNavAnimation("");
  //     setNavExpanded(true);
  //   }
  //   , 500);
  // }

  // const handleCollapse = () => {
  //   setNavAnimation("collapsing");
  //   setTimeout(() => {
  //     setNavAnimation("");
  //     setNavExpanded(false);
  //   }, 500);
  // };

  return (
    <div id="headerWrapper">
      <header id="theHeadContainer">
          <nav id="navbar" className={mobile ? "navbar-mobile" : ""}>
            <div className="navbar-brand">
              <div onClick={() => reRoute("/")} className={`navbar-brand-link ${navExpanded ? "navbar-brand-link-expanded" : ""}`}>
                <img id="navLogoLong" className={!mobile ? logoStyle : "navLogoLong"} src={blushLogo} alt="Logo" />
                <img id="navLogoShort" className={!mobile ? logoStyle : ""} src={blushShort} alt="Logo" />
              </div>
              {mobile && <svg id="navExpand" className={navExpanded ? "navExpandOpen" : ""} onClick={() => {setNavExpanded(true); document.body.style.overflowY="hidden";}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>}
            </div>

            <div className={`navbar-menu ${navExpanded ? "navbar-menu-expanded" : "navbar-menu-collapsed"}`}>
              <ul className={`navbar-start ${mobile ? "navbar-start-mobile" : ""} `}>
                <li className="navbar-item" onClick={() => {/*</li>setNavExpanded(false);*/ reRoute("/");}}>
                  <div className="navbar-link">Home</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/ServiceMenu")}>
                  <div className="navbar-link">Service Menu</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/MeetTheStaff")}>
                  <div className="navbar-link">Meet the Staff</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/PhotoGallery")}>
                  <div className="navbar-link">Photo Gallery</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/BookOnline")}>
                  <div className="navbar-link">Book Online</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/WorkWithUs")}>
                  <div className="navbar-link">Work with Us</div>
                </li>
                <li className="navbar-item" onClick={() => reRoute("/SalonPolicies")}>
                  <div className="navbar-link">Salon Policies</div>
                </li>
                {mobile && <svg id="navCollapse" onClick={() => {setNavExpanded(false); document.body.style.overflowY = "";}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>}
              </ul>
            </div>
            {!mobile && (
              <div className="navbar-social">
                <ul className="navbar-social-list">
                  <li className="navbar-social-item">
                      <a className="navbar-social-link" href="https://www.google.com/maps/place/51+Salters+Rd,+Greenville,+SC+29607" target="_blank" rel="noopener noreferrer">
                        <img alt="Google Maps" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/22db839dd0a94a1c9dd91dafe2617dc1.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22db839dd0a94a1c9dd91dafe2617dc1.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                      </a>
                  </li>
                  <li className="navbar-social-item">
                    <a className="navbar-social-link" href="https://www.facebook.com/blushmidtowngreenvillesalon" target="_blank" rel="noopener noreferrer">
                      <img alt="Facebook" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/23fd2a2be53141ed810f4d3dcdcd01fa.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                    </a>
                  </li>
                  <li className="navbar-social-item">
                    <a className="navbar-social-link" href="https://www.instagram.com/blushmidtowngreenvillesalon/" target="_blank" rel="noopener noreferrer">
                      <img alt="Instagram" data-ssr-src-done="true" fetchPriority="high" src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_32,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/81af6121f84c41a5b4391d7d37fce12a.png" style={{width: "32px", height: "32px", objectFit: "cover"}} />
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
      </header>
    </div>
  );
}
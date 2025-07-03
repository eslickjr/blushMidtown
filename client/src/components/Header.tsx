import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/Header.css";
import blushLogo from "../assets/logo/BLUSH_LogoCream.avif";
import blushShort from "../assets/logo/B.jpg";
import ClientI from "../types/client";

interface HeaderProps {
  client: ClientI | null;
  setClient: (client: ClientI | null) => void;
  clientNav: string;
  handleClientNav: (navItem: string) => void;
  bloomOut: () => void;
}

export default function Header({ client, setClient, clientNav, handleClientNav, bloomOut }: HeaderProps) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(window.innerWidth <= 1058);
  const [logoStyle, setLogoStyle] = useState(window.innerWidth >= 1511 ? "navLogoLong" : "navLogoShort");
  const [navExpanded, setNavExpanded] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayNavbarMenu, setDisplayNavbarMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 1058);
      setLogoStyle(window.innerWidth >= 1511 ? "navLogoLong" : "navLogoShort");
    };

    const dropdownOpen = () => {
      setShowDropdown(true);
      setTimeout(() => {
        setNavDropdown(true);
      }, 300); // Adjust the timeout duration as needed
    }

    const dropdownClose = () => {
      setNavDropdown(false);
      setTimeout(() => {
        setShowDropdown(false);
      }, 500); // Adjust the timeout duration as needed
    }

    document.getElementById("serviceMenuNavbarContainer")?.addEventListener("mouseenter", dropdownOpen);
    document.getElementById("serviceMenuNavbarContainer")?.addEventListener("mouseleave", dropdownClose);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.getElementById("serviceMenuNavbarContainer")?.removeEventListener("mouseenter", dropdownOpen);
      document.getElementById("serviceMenuNavbarContainer")?.removeEventListener("mouseleave", dropdownClose);
    };
  }, []);

  const reRoute = (path: string) => {
    if (!mobile) {
      bloomOut();
    } else {
      handleNavCollapse();
    }
    setTimeout(() => {
      navigate(path);
    }, 500); // Adjust the timeout duration as needed
  };

  const handleNavExpand = () => {
    setDisplayNavbarMenu(true);
    setTimeout(() => {
      setNavExpanded(true);
    }, 10);
    document.body.style.overflowY = "hidden";
  }

  const handleNavCollapse = () => {
    setTimeout(() => {
      setDisplayNavbarMenu(false);
    }, 1000); // Adjust the timeout duration as needed
    setNavExpanded(false);
    document.body.style.overflowY = "";
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
              {mobile && <svg id="navExpand" className={navExpanded ? "navExpandOpen" : ""} onClick={() => handleNavExpand()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>}
            </div>
            {client && mobile &&
              <div id="clientNavBar">
                  <p className={`clientNavItem ${clientNav === "Profile" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Profile")}>Profile</p>
                  <p className={`clientNavItem ${clientNav === "Appointments" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Appointments")}>Appointments</p>
                  <p className={`clientNavItem ${clientNav === "Payment Methods" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Payment Methods")}>Payment Methods</p>
                  <p className="clientNavItem clientNavItemInactive" onClick={() => setClient(null)}>Logout</p>
              </div>
            }
            <div className={`navbar-menu ${navExpanded ? "navbar-menu-expanded" : "navbar-menu-collapsed"} ${displayNavbarMenu ? "navbar-menu-display" : "navbar-menu-hidden"}`}>
              <ul className={`navbar-start ${mobile ? "navbar-start-mobile" : ""} `}>
                <li className="navbar-item" onClick={() => {/*</li>setNavExpanded(false);*/ reRoute("/");}}>
                  <div className="navbar-link">Home</div>
                </li>
                <li id="serviceMenuNavbarContainer" className="navbar-item">
                  <div id="serviceMenuNavbar" className="navbar-link" onClick={() => reRoute("/ServiceMenu")}>Service Menu</div>
                  {!mobile && <div id="colorServicesNavbar" className={`${navDropdown ? "navDropdown" : ""} ${showDropdown ? "showDropdown" : ""} `} onClick={() => reRoute("/ColorServices")}>Color Services</div>}
                </li>
                {mobile &&
                  <li className="navbar-item" onClick={() => reRoute("/ColorServices")}>
                    <div className="navbar-link">Color Services</div>
                  </li>
                }
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
                {mobile && <svg id="navCollapse" onClick={() => handleNavCollapse()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
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
          {client && !mobile &&
              <div id="clientNavBar">
                  <p className={`clientNavItem ${clientNav === "Profile" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Profile")}>Profile</p>
                  <p className={`clientNavItem ${clientNav === "Appointments" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Appointments")}>Appointments</p>
                  <p className={`clientNavItem ${clientNav === "Payment Methods" ? "clientNavItemActive" : "clientNavItemInactive"}`} onClick={() => handleClientNav("Payment Methods")}>Payment Methods</p>
                  <p className="clientNavItem clientNavItemInactive" onClick={() => setClient(null)}>Logout</p>
              </div>
            }
      </header>
    </div>
  );
}
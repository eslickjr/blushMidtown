import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

import "../styles/WorkWithUs.css";

import upsideDown from "../assets/work/upside_down.avif";
import katieHair from "../assets/work/katie_hair.avif";
import secret from "../assets/work/secret.avif";
import team from "../assets/work/team.avif";
import haircut from "../assets/haircut.avif";

export default function WorkWithUs() {
    const [selectState, setSelectState] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [photoNum, setPhotoNum] = useState(window.innerWidth <= 768 ? (window.innerWidth <= 490 ? 4 : 5) : 6);

    const photoArray: string[] = [upsideDown, katieHair, secret, team];

    useEffect(() => {
        const handleResize = () => {
            setPhotoNum(window.innerWidth <= 768 ? (window.innerWidth <= 490 ? 4 : 5) : 6);
        }
        window.addEventListener("resize", handleResize);

        setInterval(() => {
            setAnimating(true);

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % photoArray.length);
                setAnimating(false);
            }, 500); // Start animation after 1 second
        }, 4000); // Change image every 5 seconds

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    const workSlider = () => {

        const photoData = [];

        for (let i = 0; i < photoNum; i++) {
            photoData.push({
                id: i + 1,
                src: photoArray[(currentIndex + i) % photoArray.length],
                alt: `Work with us image ${i + 1}`
            });
        }

        return (
            <section id="workWithUsSlider" className="workWithUsSection">
                {photoData.map((photo) => (
                    <div key={photo.id} className={`workWithUsImageContainer` + (animating ? " animating" : "")}>
                        <img className="workWithUsImage" src={photo.src} alt={photo.alt} />
                    </div>
                ))}
            </section>
        );
    }

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_5ewqe1m',
            'template_rcllioz',
            e.currentTarget,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        ).then((result) => {
            console.log("Email sent successfully:", result.text);
            e.currentTarget.reset(); // Reset the form after successful submission
        }, (error) => {
            console.error("Error sending email:", error.text);
        });
    }

    return (
        <main id="workWithUsContainer">
            {workSlider()}
            <section id="workWithUsSummary" className="workWithUsSection">
                <h1 id="workWithUsHeader">Come Work with Us!</h1>
                <p className="workWithUsText">
                    <span className="workWithUsSpan">Blush Midtown Greenville Salon</span>
                    &nbsp;is a boutique style salon dedicated to being the best salon in the upstate of South Carolina by providing our guests the luxury services they desire, in a clean welcoming environment, while hosting the most talented stylists in our area.
                </p>
                <p className="workWithUsText">
                    We are a commission based salon that offers you freedom over your own schedule, competitive commission, PTO and a strong team environment. At&nbsp;
                    <span className="workWithUsSpan">Blush</span>
                    &nbsp;you will always have a mentor to help you hone your color and cutting skills, as well as teaching you how to build your brand through marketing and social media. We strongly believe in furthering our skills and knowledge by consistency seeking amazing education opportunities that keep your skills strong and your career on a constant path of growth. 
                </p>
                <p className="workWithUsText">We pride ourselves in providing a clean, upscale environment for you and your guests. We offer a coffee and tea bar with snacks, water and sodas  as well as online booking, backbar, towels and on site laundry with a clean, private break room. These are just a couple of the perks!</p>
                <p className="workWithUsText">We are always looking for driven, talented individuals to add to our team. If you feel like you are a good fit and would like to schedule an interview, please fill out the form below.</p>
            </section>
            <section id="workWithUsFormWrapper" className="workWithUsSection">
                <div id="workWithUsFormImageContainer" className="workWithUsFormContainers">
                    <img id="workWithUsFormImage" src={haircut} alt="Haircut" />
                </div>
                <div id="workWithUsFormContainer" className="workWithUsFormContainers">
                    <form id="workWithUsForm" onSubmit={(e) => sendEmail(e)}>
                        <input className="workWithUsInput" type="text" placeholder="First Name" required />
                        <input className="workWithUsInput" type="text" placeholder="Last Name" required />
                        <input className="workWithUsInput" type="email" placeholder="Email" required />
                        <input className="workWithUsInput" type="tele" placeholder="Phone" required />
                        <select className="workWithUsInput" name="licensed" id="licensed" value={selectState} onChange={e => setSelectState(e.target.value)} required>
                            <option value="" disabled hidden>I am a licensed</option>
                            <option value="cosmetologist">Cosmetologist</option>
                        </select>
                        <textarea id="workWithUsTextArea" className="workWithUsInput" placeholder="Message" required />
                        <input id="workWithUsSubmit" type="submit" value="Apply Now" />
                    </form>
                </div>
            </section>
        </main>
    );
}
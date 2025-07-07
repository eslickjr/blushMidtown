import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "../styles/MeetTheStaff.css";

import court from "../assets/staff/Courtney.avif";
import grace from "../assets/staff/Grace.avif";
import savannah from "../assets/staff/BigVan.avif";
import sydney from "../assets/staff/Sydney.avif";
import rachel from "../assets/staff/Rachel.avif";
import jen from "../assets/staff/Jen.avif";
import katie from "../assets/staff/Katie.avif";

export default function MeetTheStaff() {
    return (
        <main id="meetTheStaff">
            <Helmet>
                <title>Meet Our Expert Stylists | Blush Midtown Greenville</title>
                <meta name="description" content="Get to know the talented and friendly stylists at Blush Midtown Greenville. Our team is here to help you look and feel your best." />
            </Helmet>
            <section id="meetTheStaffWelcomeContainer">
                <div id="meetTheStaffWelcome">
                    <h1 id="meetTheStaffWelcomeHeader">WELCOME</h1>
                    <p id="meetTheStaffWelcomeText">From Owner, <i>Jen Schultz</i>: "Opening Blush has been a passion project rooted in a deep love for this industry. It was important to me to create a space where stylists feel supported, inspired, and empowered to grow both individually and as a team. My vision has always been to foster a culture built on education, collaboration, and encouragement—without competition. Watching each team member develop their unique talents in a positive, growth-focused environment is one of the most fulfilling parts of being an owner."</p>
                </div>
            </section>
            <section id="meetTheStaffContainer">
                <h1 id="meetTheStaffContainerHeader">Meet the Blush Babes</h1>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={court} alt="Courtney Schultz" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInst staffBtn" href="https://www.instagram.com/itscourtneyschair?igsh=emJ2cXUxcHQwaDMz&utm_source=qr">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Courtney Schultz
                            <br />
                            Licensed Cosmetologist
                            <br />
                            Makeup Artist
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            Grey blending, lived in blondes and brunettes, layered cuts, special event makeup
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            3 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            The atmosphere and consistency. Jennifer has created such an amazing environment. You always know what to expect working there. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            ZENAGEN! Without I would have no hair. It saved my hair in less than a year. I went from balding at the age of 27, to more hair than I’ve ever had.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            I wanted a career that’s I could express my creativity, as well as be social and connect with people. I’m a very social person, so it has been a dream job. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            I love cooking and baking! I make sourdough every week.
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={grace} alt="Grace Frisch" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInsta staffBtn" href="https://www.instagram.com/gracetheglamourguru?igsh=MWI3a3A5bmE4NHI1Yg%3D%3D&utm_source=qr">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Grace Frisch
                            <br />
                            Licensed Cosmetologist
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            I specialize in lived in color/ dimensional brunettes.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            2 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            Working with fun loving people that help and support me.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            K18 Airwash because as a brunette I always hated the white cast you would get from I normal dry shampoo and with K18 being a spray it leaves no cast!
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            I love making people look and feel their very best.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            When I’m not doing hair I like to do pottery and go on hikes.
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={savannah} alt="Savannah Clark" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInsta staffBtn" href="https://www.instagram.com/hairbysavannahclark/">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Savannah Clark
                            <br />
                            Licensed Cosmetologist
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            I specialize in blonding, red/coppers, dimensional brunettes, root coverage, color corrections
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            4 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            The creativity, atmosphere and teamwork. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            Redken quick blowout, because it is used not only as a heat protectant but it lessens the drying time.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            The ability to create something new all the time, making people feel confident.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            I was born on Halloween.
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={sydney} alt="Sydney Salgado" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInsta staffBtn" href="https://www.instagram.com/_syd.styles/">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Sydney Salgado
                            <br />
                            Licensed Cosmetologist
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            Hair cuts, grey coverage, curly hair, and brunettes
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            3 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            My coworkers, the friendly atmosphere, and the community. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            Redken's Acidic Bonding Concentrate Leave-in Conditioner. It’s a very lightweight leave in conditioner that is very moisturizing and helps with frizz. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            I love being creative and I love doing hair. It truly is my passion.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            I love animals!
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={rachel} alt="Rachel Reisinger" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInsta staffBtn" href="https://www.instagram.com/busybeebeauty22?igsh=ZWpjdG05MTNuZHpv">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Rachel Reisinger
                            <br />
                            Event Hair & Makeup
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            My specialty is special event styling and makeup - specifically bridal.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            9 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            I’m fairly new, so I would have to say that it’s the staff. They are so kind and have been so wonderful during my transition into the salon. 
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            Redken Dry Texture Spray. It’s the perfect amount of grit to add volume and hold to a hairstyle while still being touchable. It works for everyone.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            I’ve always loved makeup and hair. When I saw that my local community college was offering cosmetology, it was a natural fit.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            I love to garden. Gardening is like my therapy- give me sunshine, dirt, and something green to grow, and I’m in my element (bonus points if my toddler isn’t digging up what I just planted).
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={jen} alt="Jennifer Schultz" />
                        <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <a className="staffInsta staffBtn" href="https://www.instagram.com/thebeautychronicles2.0/">INSTAGRAM</a>
                        </div>
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Jen Schultz
                            <br />
                            Licensed Cosmetologist
                            <br />
                            Educator
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            Precision cutting, Grey Transformations/Grey Blending, Lived in color, Hair Extensions
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            23 years
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            What I love most about working at Blush is the incredible culture. Every day, I look forward to coming into a space filled with teamwork, creativity, and positivity. Our team shares a unified goal—to deliver an exceptional guest experience while creating the most beautiful hair in Greenville.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            K18 remains one of my all-time favorite products. Its innovative formula has elevated the way I approach haircare, enabling me to achieve transformative results that I once thought were beyond reach.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            My passion for the beauty industry began the moment I first stepped into a salon as a young girl—I knew instantly that I had found my calling. I’m deeply inspired by the creativity, connection, and confidence this industry brings. There’s no greater gift than making someone feel truly beautiful.
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            My mom and I share the same birthday.
                        </p>
                    </div>
                </div>
                <div className="staffContainer">
                    <div className="staffImgCon">
                        <img className="staffImg" src={katie} alt="Katie Ulrich" />
                        {/* <div className="staffLinkCon">
                            <Link className="staffApt staffBtn" to="/book-online">Schedule an Appointment</Link>
                            <Link className="staffInsta staffBtn" to="/work-with-us">INSTAGRAM</Link>
                        </div> */}
                    </div>
                    <div className="staffTextCon">
                        <h2 className="staffName">
                            Katie Ulrich
                            <br />
                            Guest Experience and Front Desk Coordinator
                        </h2>
                        <p className="staffText">
                            <strong className="staffBold">Specialties: </strong>
                            Customer Relations/Marketing
                        </p>
                        {/* <p className="staffText">
                            <strong className="staffBold">Years in the Industry: </strong>
                            2 years
                        </p> */}
                        <p className="staffText">
                            <strong className="staffBold">Favorite things about working at Blush: </strong>
                            I love getting to see clients hair dreams come to life and make them feel as comfortable as possible in the process!
                        </p>
                        <p className="staffText">
                            <strong className="staffBold">Fav Hair Product: </strong>
                            Redken Quick Blowout Heat Protectant is my favorite. It makes my hair feel and smell amazing, while keeping it protected. 
                        </p>
                        {/* <p className="staffText">
                            <strong className="staffBold">Why I'm in the Industry: </strong>
                            My passion for the beauty industry began the moment I first stepped into a salon as a young girl—I knew instantly that I had found my calling. I’m deeply inspired by the creativity, connection, and confidence this industry brings. There’s no greater gift than making someone feel truly beautiful.
                        </p> */}
                        <p className="staffText">
                            <strong className="staffBold">Fun Fact: </strong>
                            I am a creative at heart whether it is painting, designing or making my own clothes and jewelry!
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
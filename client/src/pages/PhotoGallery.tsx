
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import "../styles/PhotoGallery.css"; // Assuming you have a CSS file for styling

import alyssa from "../assets/gallery/alyssa.avif";
import bam from "../assets/gallery/bam.avif";
import bangs from "../assets/gallery/bangs.avif";
import blonde from "../assets/gallery/blonde.avif";
import bob from "../assets/gallery/bob.avif";
import bob2 from "../assets/gallery/bob2.avif";
import burgundy from "../assets/gallery/burgundy.avif";
import burnette from "../assets/gallery/burnette.avif";
import burnette2 from "../assets/gallery/burnette2.avif";
import flowers from "../assets/gallery/flowers.avif";
import frontDoor from "../assets/gallery/front_door.avif";
import greatSmile from "../assets/gallery/great_smile.avif";
import jacket from "../assets/gallery/jacket.avif";
import kidsCut from "../assets/gallery/kids_cut.avif";
import neonRed from "../assets/gallery/neon_red.avif";
import noFace from "../assets/gallery/no_face.avif";
import platinum from "../assets/gallery/platinum.avif";
import platinum2 from "../assets/gallery/platinum2.avif";
import ponytail from "../assets/gallery/ponytail.avif";
import sideProfile from "../assets/gallery/side_profile.avif";
import strawberry from "../assets/gallery/strawberry.avif";
import teal from "../assets/gallery/teal.avif";
import waves from "../assets/gallery/waves.avif";
import wedding from "../assets/gallery/wedding.avif";

export default function PhotoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [leftAnimating, setLeftAnimating] = useState(false);
    const [rightAnimating, setRightAnimating] = useState(false);

    const photoArray = [
        alyssa, bam, bangs, blonde, bob, bob2, burgundy, burnette,
        burnette2, flowers, frontDoor, greatSmile, jacket, kidsCut,
        neonRed, noFace, platinum, platinum2, ponytail, sideProfile,
        strawberry, teal, waves, wedding
    ];

    const handleLeftClick = () => {
        if (rightAnimating) return; // Prevent multiple clicks during animation
        setRightAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 2 + photoArray.length) % photoArray.length);
            setRightAnimating(false);
        }, 500); // Match this duration with your CSS animation duration
    }

    const handleRightClick = () => {
        if (leftAnimating) return; // Prevent multiple clicks during animation
        setLeftAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 2) % photoArray.length);
            setLeftAnimating(false);
        }, 500); // Match this duration with your CSS animation duration
    }

    const photosEl = () => {
        const photoData: any[] = [];

        for (let i = 0; i < 14; i++) {
            photoData.push({
                id: i + 1,
                src: photoArray[(currentIndex + i) % photoArray.length],
                alt: `Gallery Image ${i + 1}`
            });
        }
    
        return (
            <div id="photoGallery">
                <div id="photoGalleryLeftOverlay" className="photoGalleryOverlay" onClick={handleLeftClick}/>
                <div id="photoGalleryLeft" className="photoGalleryArrow">&lt;</div>
                <div id="photoGalleryRightOverlay" className="photoGalleryOverlay" onClick={handleRightClick}/>
                <div id="photoGalleryRight" className="photoGalleryArrow">&gt;</div>
                {Array.from({ length: Math.ceil(photoData.length / 2) }).map((_, i) => {
                    const first = photoData[i * 2];
                    const second = photoData[i * 2 + 1];
                    return (
                        <div key={i} className={`photo-pair ${leftAnimating ? 'animating-left' : ''} ${rightAnimating ? 'animating-right' : ''}`}>
                            <div className="photo">
                                <img src={first.src} alt={first.alt} />
                            </div>
                            {second && (
                                <div className="photo">
                                    <img src={second.src} alt={second.alt} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section id="photoGallerySection">
            <Helmet>
                <title>Salon Photo Gallery | Blush Midtown Greenville</title>
                <meta name="description" content="Browse our photo gallery showcasing stunning hair transformations, styles, and salon ambiance at Blush Midtown in Greenville." />
            </Helmet>
            {photosEl()}
            <Link id="photoGalleryLink" to="/book-online">SCHEDULE AN APPOINTMENT</Link>
        </section>
    );
}
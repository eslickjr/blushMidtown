import "../styles/SalonPolicies.css";

export default function SalonPolicies() {
    return (
        <main id="salonPolicies">
            <section id="cancellationPolicy" className="policySection">
                <h1 id="cancelHeader" className="policyHeader">Cancellation Policy</h1>
                <p id="cancelNotice" className="policyText policyBold">We understand that life happens and appointments sometimes must be canceled but we kindly request a 24 hour notice.</p>
                <p id="cancelCard" className="policyText">We will require you to put a credit card on file to book an appointment.</p>
                <p id="cancelThankYou" className="policyText policyMiniHeader">THANK YOU FOR SUPPORTING OUR SMALL BUSINESS</p>
                <p id="cancel24" className="policyText">Less than 24 hours notice will result in a fee of 50% of the reserved service price.</p>
                <p id="cancelNoCall" className="policyText">"No call, no show" will likewise be charged 50% of the reserved service price.</p>
            </section>
            <section id="adjustmentPolicy" className="policySection">
                <h1 id="adjustHeader" className="policyHeader">Adjustment Policy</h1>
                <p id="adjustUpset" className="policyText">If you are not satisfied with the service that you received during your visit with us, please contact us immediately so we can work to remedy the situation. We want nothing more than your complete satisfaction!  We do ask that you come in within one week from the original date of service for any desired tweaks to your cut or color. We do not offer refunds for services rendered.</p>
            </section>
        </main>
    );
}
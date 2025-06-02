

export function Calendar() {

    return (
        <div className="calendar-container">
            <div className="immediate-availability">
            </div>
            <div className="calendar">
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=blushmidtowngreenvillesalon%40gmail.com&ctz=America%2FNew_York"
                    style={{ border: "0", width: "100%", height: "600px" }}
                    frameBorder="0"
                    title="Blush Salon Calendar"
                ></iframe>
            </div>
        </div>
    );
}
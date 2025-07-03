
import "../styles/Calendar.css";

import { useState, useEffect } from "react";
import { getAvailabilityDaily, getAvailabilityRolling, getAvailabilityMonthly } from "utils/api/blush/stylist";

import StylistI from "../types/stylist";
import { useStylists } from "../context/BookingDataContext";

interface CalendarProps {
    setServiceDate: (date: Date | undefined) => void;
    stylist: number;
    setStylist: (stylistId: number) => void;
    serviceDuration: number;
}

export default function Calendar({ setServiceDate, stylist, setStylist, serviceDuration }: CalendarProps) {
    const curDate = new Date();
    const nextDate = new Date(curDate);
    nextDate.setDate(curDate.getDate() + 1);
    const curDay = curDate.getDate();
    // const nextDate = new Date(curDate);
    // nextDate.setDate(curDate.getDate() + 1);
    const [selectedDate, setSelectedDate] = useState(new Date(curDate).toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'));
    const curMonth = new Date().getMonth();
    const [month, setMonth] = useState(curMonth);
    const curYear = new Date().getFullYear();
    const [year, setYear] = useState(curYear);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [monthName, setMonthName] = useState(monthNames[month]);
    const [availabilityToday, setAvailabilityToday] = useState<any[]>([]);
    const [immediateAvailability, setImmediateAvailability] = useState<{ start: string; end: string }[]>([]);
    const { stylistsContext } = useStylists();
    const stylistName = stylistsContext.find((s: StylistI) => s.id === stylist)?.name || "Stylist";
    const [ monthlyAvailability, setMonthlyAvailability ] = useState<any[]>([]);

    useEffect(() => {
        const retrieveAvailability = async () => {
            try {
                let currentDate = new Date(selectedDate);
                let availabilityData = [];

                while (availabilityData.length === 0) {
                    const formattedDate = currentDate.toISOString().split("T")[0];
                    availabilityData = await getAvailabilityDaily(stylist, formattedDate, serviceDuration);
                    
                    if (availabilityData.length === 0) {
                        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day if no availability found
                    }
                }
                
                setAvailabilityToday(availabilityData);
                setSelectedDate(currentDate.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'));
            } catch (error) {
                console.error("Error retrieving availability:", error);
            }
        }

        if (stylist !== -1) {
            retrieveAvailability();
        } else {
            setAvailabilityToday([]);
        }
    }, [selectedDate]);

    useEffect(() => {
        const retrieveMonthlyAvailability = async () => {
            try {
                const availabilityData = await getAvailabilityMonthly(stylist, `${year}-${String(month + 1).padStart(2, '0')}-01`, serviceDuration);
                setMonthlyAvailability(availabilityData);
            } catch (error) {
                console.error("Error retrieving monthly availability:", error);
            }
        }

        const retrieveImmediateAvailability = async () => {
            try {
                const availabilityData = await getAvailabilityRolling(stylist, serviceDuration, 30, 10);
                setImmediateAvailability(availabilityData);
            } catch (error) {
                console.error("Error retrieving immediate availability:", error);
            }
        }

        retrieveMonthlyAvailability();
        retrieveImmediateAvailability();
    }, []);
    // const availabilityToday = [
    //     {
    //        time: `${selectedDate}T09:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T10:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T11:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T12:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T13:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T14:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T15:00:00-04:00`
    //     },
    //     {
    //        time: `${selectedDate}T16:00:00-04:00`
    //     }
    // ];

    // const availabilityTomorrow = [
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T09:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T10:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T11:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T12:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T13:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T14:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T15:00:00-04:00`
    //     },
    //     {
    //         time: `${nextDate.toISOString().split("T")[0]}T16:00:00-04:00`
    //     }
    // ];
    //     }
    // ];

    const availability = (availability: { start: Date; end: Date }[]) => {
        if (availability.length === 0) {
            return (
                <div className="noAvailability">
                    <p id="noAvailability" className="noAvailabilityTime">No availability for {stylistName} on {new Date(selectedDate).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p id="selectAnother" className="noAvailabilityTime">Please select another date or contact us for more information.</p>
                </div>
            );
        } else {
            // const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return availability.map((slot, index: number) => {
                const date = slot.start;
                const formattedTime = date.toLocaleTimeString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                return (
                    <div key={index} className="availabilitySlot" onClick={() => setServiceDate(date)}>
                        <p className="availabilityTime">{`${formattedTime}`}</p>
                    </div>
                );
            });
        }
    }

    const immediateAvailabilityList = () => {
        return immediateAvailability.map((slot: { start: string; end: string }, index: number) => {
            const date = new Date(slot.start);
            const formattedTime = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
            return (
                <div key={index} className="immediateAvailabilitySlot" onClick={() => {
                    setServiceDate(date);
                    setSelectedDate(date.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'));
                }}>
                    <p className="immediateAvailabilityTime">{`${formattedTime}`}</p>
                </div>
            );
        });
    }

    const selectDate = (i: number) => {
        const tempDate = new Date(year, month, i, 4, 0, 0, 0); // Set to 4 AM to avoid timezone issues

        if (tempDate >= new Date(new Date(curDate).setHours(0, 0, 0, 0))) {
            setSelectedDate(tempDate.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'));
        }
    }

    const calendarBuild = () => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const prevMonthStartDay = prevMonthLastDay - startDay + 1;
        const totalCells = 35;

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Generate all cells
        const cells = [];
        for (let i = 0; i < totalCells; i++) {
            let content;
            let key = `cell-${i}`;

            if (i < 7) {
                // Header row
                const label = dayNames[i];
                const date = i < startDay ? prevMonthStartDay + i : i - startDay + 1;
                if (i < startDay) {
                    content = <th key={key} className={`calendarHeadCell calendarPrevMonth`}><div className="cellWrapper"><p className="calendarDayName">{label}</p><p className="calendarDay">{date}</p></div></th>;
                } else {
                    if (monthlyAvailability[i - startDay]) {
                        content = <th key={key} className={`calendarHeadCell ${curMonth === month && curYear === year ? curDay === i - startDay + 1 ? "calendarCurDay" : i - startDay + 1 < curDay ? "calendarPrevDay" : "calendarCurMonth " : "calendarCurMonth "} ${selectedDate === new Date(year, month, (i - startDay + 1)).toISOString().split("T")[0] ? "calendarSelectDay" : ""}`} onClick={() => selectDate(i - startDay + 1)}><div className="cellWrapper"><p className="calendarDayName">{label}</p><p className="calendarDay">{date}</p></div></th>;
                    } else {
                        content = <th key={key} className={`calendarHeadCell ${curMonth === month && curYear === year ? curDay === i - startDay + 1 ? "calendarCurDay" : i - startDay + 1 < curDay ? "calendarPrevDay" : "" : ""} calendarFullDay`} ><div className="cellWrapper"><p className="calendarDayName">{label}</p><p className="calendarDay">{date}</p></div></th>;
                    }
                }
            } else {
                if (i < startDay + daysInMonth) {
                    if (monthlyAvailability[i - startDay]) {
                        content = <td key={key} className={`calendarCell ${curMonth === month && curYear === year ? curDay === i - startDay + 1 ? "calendarCurDay" : i - startDay + 1 < curDay ? "calendarPrevDay" : "calendarCurMonth " : "calendarCurMonth "} ${selectedDate === new Date(year, month, i-startDay + 1).toISOString().split("T")[0] ? "calendarSelectDay" : ""}`} onClick={() => selectDate(i - startDay + 1)}><div className="cellWrapper"><p className="calendarDay">{i - startDay + 1}</p></div></td>;
                    } else {
                        content = <td key={key} className={`calendarCell ${curMonth === month && curYear === year ? curDay === i - startDay + 1 ? "calendarCurDay" : i - startDay + 1 < curDay ? "calendarPrevDay" : "" : ""} calendarFullDay`}><div className="cellWrapper"><p className="calendarDay">{i - startDay + 1}</p></div></td>;
                    }
                } else {
                    content = <td key={key} className="calendarNextMonth calendarCell"><div className="cellWrapper"><p className="calendarDay">{i - (startDay + daysInMonth) + 1}</p></div></td>;
                }
            }

            cells.push(content);
        }

        // Break cells into rows of 7
        const rows = [];
        for (let i = 0; i < totalCells; i += 7) {
            const row = cells.slice(i, i + 7);
            rows.push(<tr key={`row-${i / 7}`} className={i < 7 ? "calendarHeadRow" : "calendarRow"}>{row}</tr>);
        }

        return (
            <table className="calendarTable">
                <thead className="calendarHead">{rows[0]}</thead>
                <tbody className="calendarBody">{rows.slice(1)}</tbody>
            </table>
        );
    };

    const increaseMonth = async () => {
        if (month === 11) {
            const availabilityData = await getAvailabilityMonthly(stylist, `${year + 1}-00`, serviceDuration);
            setMonthlyAvailability(availabilityData);
            setMonth(0);
            setYear(year + 1);
        } else {
            const availabilityData = await getAvailabilityMonthly(stylist, `${year}-${String(month + 2).padStart(2, '0')}-01`, serviceDuration);
            setMonthlyAvailability(availabilityData);
            setMonth(month + 1);
        }
        setMonthName(monthNames[(month + 1) % 12]);
    }

    const decreaseMonth = async () => {
        if (month !== curMonth || year !== curYear) {
            if (month === 0) {
                const availabilityData = await getAvailabilityMonthly(stylist, `${year - 1}-11`, serviceDuration);
                setMonthlyAvailability(availabilityData);
                setMonth(11);
                setYear(year - 1);
            } else {
                const availabilityData = await getAvailabilityMonthly(stylist, `${year}-${String(month).padStart(2, '0')}-01`, serviceDuration);
                setMonthlyAvailability(availabilityData);
                setMonth(month - 1);
            }
            setMonthName(monthNames[(month - 1 + 12) % 12]);
        }
    }

    return (
        <div className="calendar-container">
            <div className="immediateAvailability">
                <h2 id="availabilityBack" onClick={() => setStylist(-1)}>Back</h2>
                <div className="availabilityToday">
                    <h1 id="availabilityHeader">Select an appointment slot</h1>
                    <h2 className="availabilityTitle">{selectedDate === curDate.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') ? 
                        "Availability Today"
                    :
                        selectedDate === nextDate.toLocaleDateString("en-CA", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') ?
                            "Availability Tomorrow"
                        :
                            curYear === new Date(`${selectedDate}T04:00:00-04:00`).getFullYear() ?
                                `Availability ${new Date(`${selectedDate}T04:00:00-04:00`).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}`
                            :
                                `${new Date(`${selectedDate}T04:00:00-04:00`).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
                    }
                        </h2>
                    <div className="availabilityContainer">
                        {availability(availabilityToday)}
                    </div>
                </div>
                <div className="availabilityTomorrow">
                    <h2 className="availabilityTitle">Tomorrow</h2>
                    <div className="availabilityContainer">
                        {immediateAvailabilityList()}
                    </div>
                </div>
            </div>
            <div className="calendar">
                <div className="calendarTitle">
                    <p className={curMonth === month ? "greyDecreaseMonth" : "decreaseMonth"} onClick={() => decreaseMonth()}>&lt;</p>
                    <h2 className="calendarMonth">{monthName}</h2>
                    <p className="increaseMonth" onClick={() => increaseMonth()}>&gt;</p>
                </div>
                {calendarBuild()}
            </div>
        </div>
    );
}
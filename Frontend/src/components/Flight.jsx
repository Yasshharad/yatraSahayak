import React from 'react';


const Flight = ({ flights }) => (
    <div className="card">
        <div className="card-content">
            <h2 className="card-title">{flights.airline}</h2>

            <div className="flights-info">
                <p><b>Duration:</b> {flights.duration}</p>
                <p><b>Departure-time:</b> {flights.departure_time}</p>
                <p><b>Destination-time:</b> {flights.destination_time}</p>
                <p><b>Departure-date:</b> {flights.departure_date}</p>
                <p><b>Destination-date:</b> {flights.destination_date}</p>
                <p><b>Formatted-date:</b> {flights.formatted_date}</p>
            </div>
            <div className="dest">
                <p><b>Destination:</b> {flights.destination}</p>
                <p><b>Departure:</b> {flights.departure}</p>
            </div>
            <p className="price">Price: ₹ {flights.price}</p>
        </div>    
    </div>
);

export default Flight

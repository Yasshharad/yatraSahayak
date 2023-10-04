import React from 'react';


// const BusReturn = ({ busDataReturn }) => (
//     <div className="card">
//         <div className="card-content">
//             <h2 className="card-title">{busDataReturn.agency}</h2>
//             <p className='class'>{busDataReturn.class}</p>

//             <div className="bus-info">
//                 <p><b>Seats Left:</b> {busDataReturn.seats_left}</p>
//                 <p><b>Departure-time:</b> {busDataReturn.departure_time}</p>
//                 <p><b>Duration:</b> {busDataReturn.duration}</p>
//                 <p><b>Destination-time:</b> {busDataReturn.destination_time}</p>
//                 <p><b>Date:</b> {busDataReturn.date}</p>
//             </div>
//             <div className="dest">
//                 <p><b>Destination:</b> {busDataReturn.destination}</p>
//                 <p><b>Departure:</b> {busDataReturn.departure}</p>
//             </div>
//             <p className="price">Price: ₹ {busDataReturn.price}</p>
//         </div>
//     </div>
// );

const BusReturn = ({ item }) => (
    <div className="card">
        <div className="card-content">
            <h2 className="card-title">{item?.name}</h2>
            {/* <p className='class'>{busDataReturn.class}</p> */}

            <div className="bus-info">
                {/* <p><b>Seats Left:</b> {busDataReturn.seats_left}</p>
                <p><b>Departure-time:</b> {busDataReturn.departure_time}</p>
                <p><b>Duration:</b> {busDataReturn.duration}</p>
                <p><b>Destination-time:</b> {busDataReturn.destination_time}</p> */}
                <p><b>Date:</b> {item?.date}</p>
            </div>
            <div className="dest">
                <p><b>Destination:</b> {item?.destination}</p>
                <p><b>Departure:</b> {item?.start_location}</p>
            </div>
            <p className="price">Price: ₹ {item?.price}</p>
        </div>
    </div>
);

export default BusReturn

// 🕹️📕📜📤📥📌
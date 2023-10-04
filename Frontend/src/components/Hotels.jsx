import React from 'react';


// const Hotels = ({ hotels }) => (
//     <div className="card">
//         <div className="card-content">
//             <h2 className="card-title">{hotels.name}</h2>
//             <p className="card-location">{hotels.location}</p>
//             <div className="card-details">
//                 <p><b>Check-In:</b> {hotels.checkin}</p>
//                 <p><b>Check-Out:</b> {hotels.checkout}</p>
//                 <p><b>Score:</b> {hotels.score}</p>
//                 <p><b>Price for:</b> {hotels.price_for}</p>
//             </div>
//         </div>

//         <div className="review">
//             <p><b>Reviews Count:</b> {hotels.reviews_count}</p>
//             <p className="avg-review">{hotels.avg_review}</p>
//             <p className="price">Price: ₹ {hotels.price}</p>
//         </div>

//         <div className="availability">
//             <p className="availability-text">Availability: Check on Booking.com</p>
//         </div>

//         <div className="link-button">
//             <a
//                 href={hotels.map_link}>Learn
//                 More</a>
//         </div>
//     </div>
// );
const Hotels = ({ item }) => (
    <div className="card">
        <div className="card-content">
            <h2 className="card-title">{item?.name}</h2>
            <p className="card-location">{item?.address}</p>
            <div className="card-details">
                <p><b>Check-In:</b> {item?.date}</p>
                {/* <p><b>Check-Out:</b> {item?.name}</p> */}
                {/* <p><b>Score:</b> {hotels.score}</p>
                <p><b>Price for:</b> {hotels.price_for}</p> */}
            </div>
        </div>

        <div className="review">
            {/* <p><b>Reviews Count:</b> {hotels.reviews_count}</p>
            <p className="avg-review">{hotels.avg_review}</p> */}
            <p className="price">Price: ₹ {item?.price}</p>
        </div>

        {/* <div className="availability">
            <p className="availability-text">Availability: Check on Booking.com</p>
        </div>

        <div className="link-button">
            <a
                href={hotels.map_link}>Learn
                More</a>
        </div> */}
    </div>
);

export default Hotels
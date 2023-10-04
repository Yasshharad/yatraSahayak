import React from 'react';


// const Locations = ({ locationData, index }) => (
//     <div className="locations-item">
//         <div className="locations-item-content">

//             <p className="card-number">{index + 1}</p>

//             <p className='card-location'>{locationData.location}</p>
//             <h3 className='card-place'>{locationData.place}</h3>

//             <div className="card-ratings">
//                 <span className='bold'>Rating: {locationData.rating}</span>
//                 <p className='total_ratings'>| {locationData.ratingCount}</p>
//             </div>

//             <p className="card-status">Status: {locationData.status}</p>
//             <span className="circle" />
//         </div>
//     </div>

// );

const Locations = ({ item, index }) => (
    <div className="locations-item">
        <div className="locations-item-content">

            {/* <p className="card-number">{index + 1}</p> */}

            <p className='card-location'>{item?.name}</p>
            <h3 className='card-place'>{item?.address}</h3>

            {/* <div className="card-ratings">
                <span className='bold'>Rating: {locationData.rating}</span>
                <p className='total_ratings'>| {locationData.ratingCount}</p>
            </div>

            <p className="card-status">Status: {locationData.status}</p> */}
            <span className="circle" />
        </div>
    </div>

);

export default Locations
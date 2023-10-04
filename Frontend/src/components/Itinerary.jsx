import React from 'react';
import Locations from './Locations';
import Hotels from './Hotels';
import Restaurants from './Restaurants';
import Bus from './Bus';
import { busData, busDataReturn, flights, flightsReturn, locationData, train } from './data.jsx';
import { hotels } from './data.jsx';
import { restaurants } from './data.jsx';
import { HiPaperAirplane } from 'react-icons/hi2'
import BusReturn from './BusReturn';
import Flight from './Flight';
import FlightReturn from './FlightReturn';
import Trains from './Trains';
import { useLocation } from 'react-router-dom';

const Itinerary = () => {
    const location = useLocation();
    const itineraryData = location.state?.itineraryData;

    if (!itineraryData) {
        return <div>No itinerary data available.</div>;
    }
    return (
        <div>
            {/* <h2>Generated Itinerary</h2>
            <ul>
                <h1>Transportation:</h1>
                {itineraryData?.itinerary.transportation?.map((item, index) => (
                    <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                ))}
            </ul>
            <ul>
                <h1>Hotels:</h1>
                {itineraryData?.itinerary.hotels?.map((item, index) => (
                    <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                ))}
            </ul>
            <ul>
                <h1>Restaurants:</h1>
                {itineraryData?.itinerary.restaurants?.map((item, index) => (
                    <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                ))}
            </ul>
            <ul>
                <h1>Attractions:</h1>
                {itineraryData?.itinerary.attraction?.map((item, index) => (
                    <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                ))}
            </ul>
            <ul>
                <h1>Return:</h1>
                {itineraryData?.itinerary.return_transportation?.map((item, index) => (
                    <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                ))}
            </ul>
            <h2>Calculations</h2>
            <p>Transportation: {itineraryData?.total_cost.transportation}</p>
            <p>Hotel: {itineraryData?.total_cost.hotel}</p>
            <p>Food: {itineraryData?.total_cost.food}</p>
            <p>Attractions: {itineraryData?.total_cost.attractions}</p>
            <p>Total Cost: {itineraryData?.total_cost.total}</p> */}
            <div className='container-new'>
                <h1 className='head-1'>Travel in Mumbai</h1>
                <div className='sub-head'>
                    <HiPaperAirplane className='sub-head-img' />
                    <h3 className='head-2'>Itinerary</h3>
                </div>

                <div>
                    {locationData.length > 0 ? (
                        <div className="locations-container">
                            {/* {locationData.map((item, idx) => (
                                <Locations locationData={item} index={idx} key={idx} />
                            ))} */}
                            {itineraryData?.itinerary.attraction?.map((item, index) => (
                                // <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                                <Locations key={index} item={item} />
                            ))}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <hr />

                <h1 className='head-3'>Estimated Cost (INR)</h1>
                <p>Transportation: {itineraryData?.total_cost.transportation}</p>
                <p>Hotel: {itineraryData?.total_cost.hotel}</p>
                <p>Food: {itineraryData?.total_cost.food}</p>
                <p>Attractions: {itineraryData?.total_cost.attractions}</p>
                <p>Total Cost: {itineraryData?.total_cost.total}</p>

                <h2 className='all-sub-head'>Hotel:</h2>
                <div className='hotel-card'>
                    {/* {hotels.map((hotels, index) => (
                        <Hotels key={index} hotels={hotels} />
                    ))} */}
                    {itineraryData?.itinerary.hotels?.map((item, index) => (
                        // <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        <Hotels key={index} item={item} />
                    ))}
                </div>
                <hr />

                <h2 className='all-sub-head'>Restaurant:</h2>
                <div className='hotel-card'>
                    {/* {restaurants.map((restaurants, index) => (
                        <Restaurants key={index} restaurants={restaurants} />
                    ))} */}
                    {itineraryData?.itinerary.restaurants?.map((item, index) => (
                        // <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        <Restaurants key={index} item={item} />
                    ))}
                </div>

                <hr />

                <h2 className='all-sub-head'>Bus Details:</h2>
                <div className='bus-card'>
                    <div className="sub-card">
                        <h2 className="head-4">📤Bus from initial location</h2>
                        {/* {busData.map((busData, index) => (
                            <Bus key={index} busData={busData} />
                        ))} */}
                        {itineraryData?.itinerary.transportation?.map((item, index) => (
                            // <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                            <Bus key={index} item={item} />
                        ))}
                    </div>

                    <div className="sub-card">
                        <h2 className="head-4">📥Bus while returning</h2>
                        {/* {busDataReturn.map((busDataReturn, index) => (
                            <BusReturn key={index} busDataReturn={busDataReturn} />
                        ))} */}
                        {itineraryData?.itinerary.return_transportation?.map((item, index) => (
                            // <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                            <BusReturn key={index} item={item} />
                        ))}
                    </div>
                </div>

                {/* <hr />

                <h2 className='all-sub-head'>Flight Details:</h2>
                <div className='bus-card'>
                    <div className="sub-card">
                        <h2 className="head-4">✈️ Flight from initial location</h2>
                        {flights.map((flights, index) => (
                            <Flight key={index} flights={flights} />
                        ))}
                    </div>

                    <div className="sub-card">
                        <h2 className="head-4">✈️ Flight while returning</h2>
                        {flightsReturn.map((flightsReturn, index) => (
                            <FlightReturn key={index} flightsReturn={flightsReturn} />
                        ))}
                    </div>
                </div>

                <hr />

                <h2 className='all-sub-head'>Trains:</h2>
                <div className='train-card'>
                    <h2 className="head-4">🚊 Train from initial location</h2>
                    {train.map((train, index) => (
                        <Trains key={index} train={train} />
                    ))}
                </div> */}


            </div>
        </div>
    );
}

export default Itinerary;

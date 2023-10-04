import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

function PlanTrip() {
    const [itineraryData, setItineraryData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    // const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const requestData = Object.fromEntries(formData.entries());

        requestData.budget = parseInt(requestData.budget, 10);
        requestData.num_travelers = parseInt(requestData.num_travelers, 10);
        requestData.duration_of_stay = parseInt(requestData.duration_of_stay, 10);

        try {
            const response = await axios.post('http://localhost:4000/generate-itinerary', requestData);

            if (response.data.total_cost.total > requestData.budget) {
                setError('Total cost exceeds the budget. Please increase your budget.');
                setItineraryData(null);
            } else {
                setItineraryData(response.data);
                setSuccess('Itinerary is generated, click on view itinerary')
                setError(null);

                navigate('/Itinerary', { state: { itineraryData: response.data } });
            }
        } catch (err) {
            setError('Unable to generate itinerary. Please check your input.');
            setItineraryData(null);
        }
    };

    return (
        <div>
            <h1>Travel Itinerary Planner</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Number of Travelers:
                    <input type="number" name="num_travelers" required />
                </label>
                <br />
                <label>
                    Start Location:
                    <input type="text" name="start_location" required />
                </label>
                <br />
                <label>
                    Destination:
                    <input type="text" name="destination" required />
                </label>
                <br />
                <label>
                    Budget:
                    <input type="number" name="budget" required />
                </label>
                <br />
                <label>
                    Date of Departure:
                    <input type="date" name="date_of_departure" required />
                </label>
                <br />
                <label>
                    Date of Return:
                    <input type="date" name="date_of_return" required />
                </label>
                <br />
                <label>
                    Duration of Stay (in days):
                    <input type="number" name="duration_of_stay" required />
                </label>
                <br />
                <button type="submit">Generate Itinerary</button>
            </form>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}

            {itineraryData && (
                <div>
                    <h2>Generated Itinerary</h2>
                    <ul>
                        <h1>Transportation:</h1>
                        {itineraryData.itinerary.transportation?.map((item, index) => (
                            <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        ))}
                    </ul>
                    <ul>
                        <h1>Hotels:</h1>
                        {itineraryData.itinerary.hotels?.map((item, index) => (
                            <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        ))}
                    </ul>
                    <ul>
                        <h1>Restaurants:</h1>
                        {itineraryData.itinerary.restaurants?.map((item, index) => (
                            <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        ))}
                    </ul>
                    <ul>
                        <h1>Attractions:</h1>
                        {itineraryData.itinerary.attraction?.map((item, index) => (
                            <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        ))}
                    </ul>
                    <ul>
                        <h1>Return:</h1>
                        {itineraryData.itinerary.attraction?.map((item, index) => (
                            <li key={index}>Name: {item?.name},Price: {item?.price}</li>
                        ))}
                    </ul>
                    <h2>Calculations</h2>
                    <p>Transportation: {itineraryData.total_cost.transportation}</p>
                    <p>Hotel: {itineraryData.total_cost.hotel}</p>
                    <p>Food: {itineraryData.total_cost.food}</p>
                    <p>Attractions: {itineraryData.total_cost.attractions}</p>
                    <p>Total Cost: {itineraryData.total_cost.total}</p>
                </div>
            )}
        </div>
    );
}

export default PlanTrip
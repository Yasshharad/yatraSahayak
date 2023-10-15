import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function formatDateToDDMMYYYY(date) {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
}

function PlanTrip() {
    const [itineraryData, setItineraryData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const requestData = Object.fromEntries(formData.entries());
        console.log(requestData);

        requestData.budget = parseInt(requestData.budget, 10);
        requestData.num_travelers = parseInt(requestData.num_travelers, 10);
        requestData.duration_of_stay = parseInt(requestData.duration_of_stay, 10);
        requestData.date_of_departure = formatDateToDDMMYYYY(requestData.date_of_departure);
        requestData.date_of_return = formatDateToDDMMYYYY(requestData.date_of_return);

        try {
            const response = await axios.post('http://localhost:4000/generate-itinerary', requestData);

            if (response.data.total_cost.total > requestData.budget) {
                setError('Total cost exceeds the budget. Please increase your budget.');
                setItineraryData(null);
            } else {
                setItineraryData(response.data);
                setSuccess('Itinerary is generated, click on view itinerary');
                console.log(itineraryData);
                setError(null);

                navigate('/Itinerary', { state: { itineraryData: response.data } });
            }
        } catch (err) {
            setError('Unable to generate itinerary. Please check your input.');
            setItineraryData(null);
        }
    };
    const [start_location, setStart_location] = useState('');
    const handleStart_location = (event) => {
        setStart_location(event.target.value);
    };

    const [destination, setDestination] = useState('');
    const handleDestination = (event) => {
        setDestination(event.target.value);
    };

    //Date
    const [date_of_departure, setDate_of_departure] = useState('');
    const [date_of_return, setDate_of_return] = useState('');

    //Count Days
    const [duration_of_stay, setDuration_of_stay] = useState(1);

    const handleIncrement = () => {
        setDuration_of_stay(prevDuration_of_stay => prevDuration_of_stay + 1);
    };

    const handleDecrement = () => {
        if (duration_of_stay > 1) {
            setDuration_of_stay(prevDuration_of_stay => prevDuration_of_stay - 1);
        }
    };

    //Price
    const [budget, setBudget] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setBudget(Number(inputValue));
        }
    };


    //No of people
    const [num_travelers, setNum_travelers] = useState(1);

    const handleNum_travelers = (event) => {
        const newValue = parseInt(event.target.value, 10);

        setNum_travelers(isNaN(newValue) ? 1 : newValue);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <section className='trip-content'>
                    <h1>Tell us your travel preferences</h1>

                    <p className='mid-text'>What is the starting location ?</p>
                    <div>
                        <select className='drop-down' name="start_location" required>
                            <option value="">Select City</option>
                            <option value="Ahamdabad" name="start_location">Ahamdabad</option>
                            <option value="Bengaluru" name="start_location">Bengaluru</option>
                            <option value="Delhi" name="start_location">Delhi</option>
                            <option value="Indore" name="start_location">Indore</option>
                            <option value="Kolhapur" name="start_location">Kolhapur</option>
                            <option value="Nagpur" name="start_location">Nagpur</option>
                            <option value="Nashik" name="start_location">Nashik</option>
                            <option value="Panaji" name="start_location">Panaji</option>
                            <option value="Pune" name="start_location">Pune</option>

                        </select>
                    </div>
                    <hr />

                    <p className='mid-text'>What is destination of choice ?</p>
                    <div>
                        <select className='drop-down' name="destination" required>
                            <option value="">Select City</option>
                            <option value="Mumbai" name="destination">Mumbai</option>

                        </select>
                    </div>
                    <hr />

                    <p className='mid-text'>When are you planning to travel ?</p>


                    <div className="datePickerDiv">
                        <input
                            type='date'
                            name="date_of_departure"
                            className='Date'
                            onChange={(event) => setDate_of_departure(event.target.value)}
                            required
                        />
                        <input
                            type='date'
                            name="date_of_return"
                            className='Date'
                            onChange={(event) => setDate_of_return(event.target.value)}
                            min={date_of_departure}
                            required
                        />
                    </div>


                    <hr />

                    <p className='mid-text'>How many days are you planning to travel ?</p>
                    <div className='day-count'>
                        <p>Day</p>
                        <input type="number" name="duration_of_stay" required />
                    </div>
                    <hr />

                    <p className='mid-text'>What's your budget ?</p>
                    <p>The budget is exclusively allocated for travellingg and dining purposes.</p>

                    <input
                        id="budget"
                        name="budget"
                        type="text"
                        onChange={handleChange}
                        required
                    />


                    <hr />

                    <p className='mid-text'>What is the number of people travelling ?</p>
                    <div className='people-count'>
                        <input
                            id="num_travelers"
                            name="num_travelers"
                            type="number"
                            onChange={handleNum_travelers}
                            required
                        />
                    </div>

                </section>

                <div className='submit'>
                    <button type="submit" className='btn-submit'>Submit</button>
                </div>

            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}

        </div>
    );
}

export default PlanTrip
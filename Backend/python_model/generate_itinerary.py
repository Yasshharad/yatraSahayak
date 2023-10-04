import sys
import json
# from typing import List, Dict

attractions_data = [
    {
        "name": "Gateway of India",
        "price": 100,
        "address": "Mumbai, India"
    },
    {
        "name": "Marine Drive",
        "price": 0,
        "address": "Mumbai, India"
    },
    {
        "name": "Chhatrapati Shivaji Maharaj Terminus",
        "price": 50,
        "address": "Mumbai, India"
    },
    {
        "name": "Elephanta Caves",
        "price": 200,
        "address": "Mumbai, India"
    },
    {
        "name": "Siddhivinayak Temple",
        "price": 0,
        "address": "Mumbai, India"
    }
]

bus_data = [
    {
        "name": "ABC",
        "date": "2023-10-01",
        "price": 1000,
        "start_location": "Ahmedabad",
        "destination": "Mumbai"
    }
]

trains_data = [
    {
        "name": "PQR", 
        "date": "2023-10-01",
        "price": 1500,
        "start_location": "Ahmedabad",
        "destination": "Mumbai"
    }
]

flights_data = [
    {
        "name": "XYZ",
        "date": "2023-10-01",
        "price": 2000,
        "start_location": "Mumbai",
        "destination": "Ahmedabad"
    }
]

bus_data_return = [
    {
        "name": "XYZ",
        "date": "2023-10-03",
        "price": 1000,
        "start_location": "Mumbai",
        "destination": "Ahmedabad"
    }
]

trains_data_return = [
    {   
        "name": "PQR",
        "date": "2023-10-03",
        "price": 1500,
        "start_location": "Mumbai",
        "destination": "Ahmedabad"
    }
]

flights_data_return = [
    {
        "name": "XYZ",
        "date": "2023-10-03",
        "price": 2000,
        "start_location": "Ahmedabad",
        "destination": "Mumbai"
    }
]

hotels_data = [
    {
        "name": "Taj Mahal Palace Hotel",
        "price": 10000,
        "address": "Mumbai",
        "date" : "2023-10-01"
    },
    {
        "name": "The Oberoi Mumbai",
        "price": 8000,
        "address": "Mumbai",
        "date" : "2023-10-01"
    },
    {
        "name": "The Trident Nariman Point, Mumbai",
        "price": 6000,
        "address": "Mumbai",
        "date" : "2023-10-01"
    },
    {
        "name": "Abc",
        "price": 1300,
        "address": "Delhi",
        "date" : "2023-10-01"
    },
    {
        "name": "xyz",
        "price": 1000,
        "address": "Pune",
        "date" : "2023-10-01"
    },
]

restaurants_data = [
    {
        "name": "Trishna",
        "price": 1800,
        "address": "Mumbai"
    },
    {
        "name": "Abc",
        "price": 2300,
        "address": "Delhi"
    },
    {
        "name": "xyz",
        "price": 2000,
        "address": "Pune"
    },
    {
        "name": "Masala Library",
        "price": 1500,
        "address": "Mumbai"
    },
    {
        "name": "The Table",
        "price": 1000,
        "address": "Mumbai"
    }
]

class GreedyTravelItineraryModel:
  def __init__(self, attractions_data, hotels_data, restaurants_data, bus_data, trains_data, flights_data, bus_data_return, trains_data_return, flights_data_return):
    self.attractions_data = attractions_data
    self.hotels_data = hotels_data
    self.restaurants_data = restaurants_data
    self.bus_data = bus_data
    self.trains_data = trains_data
    self.flights_data = flights_data
    self.bus_data_return = bus_data_return
    self.trains_data_return = trains_data_return
    self.flights_data_return = flights_data_return

  def generate_itinerary(self, num_travelers, start_location, destination, budget, date_of_departure, date_of_return, duration_of_stay):

    # Initialize the itinerary
    itinerary = []

    # Choose the best transportation option
    transportation = None
    for transportation_option in self.bus_data + self.trains_data + self.flights_data:
        if transportation_option["price"] <= budget and transportation_option["date"] == date_of_departure:
            if transportation is None or transportation_option["price"] < transportation["price"]:
                transportation = transportation_option

    # Choose the best return_transportation option
    return_transportation = None
    for return_transportation_option in self.bus_data_return + self.trains_data_return + self.flights_data_return:
        if return_transportation_option["price"] <= budget and return_transportation_option["date"] == date_of_return:
            if return_transportation is None or return_transportation_option["price"] < return_transportation["price"]:
                return_transportation = return_transportation_option

    # Choose the best hotel
    hotel = None
    for hotel_option in self.hotels_data:
        if hotel_option["price"] <= budget and hotel_option["address"] == destination and hotel_option["date"] == date_of_departure:
            if hotel is None or hotel_option["price"] < hotel["price"]:
                hotel = hotel_option

    # Choose the best restaurants
    restaurants = []
    num_restaurants = min(2 * data["duration_of_stay"], len(self.restaurants_data))
    for restaurant_option in self.restaurants_data[:num_restaurants]:
        if restaurant_option["price"] <= budget and restaurant_option["address"] == destination:
            restaurants.append(restaurant_option)

    # Choose the best attractions
    attractions = []
    num_attractions = min(2 * data["duration_of_stay"], len(self.attractions_data))
    for attraction_option in self.attractions_data[:num_attractions]:
        if attraction_option["price"] <= budget:
            attractions.append(attraction_option)

    # Add the transportation, hotel, restaurants, and attractions to the itinerary
    itinerary.append(transportation)
    itinerary.append(hotel)
    itinerary.extend(restaurants)
    itinerary.extend(attractions)
    itinerary.append(return_transportation)

    # Calculate the total cost of the itinerary
    total_cost = 0
    for item in itinerary:
        # Check if item is not None and has a 'price'
        if item and 'price' in item:
            total_cost += item['price']

    # Check if the total cost is greater than the budget
    if total_cost > budget:
        return None
    else:
        return itinerary


data = json.loads(sys.argv[1])


# Initialize the model
model = GreedyTravelItineraryModel(attractions_data, hotels_data, restaurants_data, bus_data, trains_data, flights_data, bus_data_return, trains_data_return, flights_data_return)

# Generate the itinerary
itinerary = model.generate_itinerary(data['num_travelers'], data['start_location'], data['destination'], data['budget'], data['date_of_departure'], data['date_of_return'], data['duration_of_stay'])


# Calculate the total cost of the itinerary
total_cost_transportation = 0
total_cost_return_transportation = 0
total_cost_hotel = 0
total_cost_food = 0
total_cost_attractions = 0
total_cost_transportation_both=0
restaurant_items = []
attractions_items = []

# Iterate through the itinerary and calculate costs
for item in itinerary:
    if isinstance(item, dict) and 'price' in item:
        # Check if the item is transportation, hotel, return_transportation, or attraction
        if item in bus_data + trains_data + flights_data:
            total_cost_transportation += item['price'] * data["num_travelers"]
            transportation_items = [item]
        elif item in hotels_data:
            total_cost_hotel += item['price'] * data["num_travelers"] * data["duration_of_stay"]
            hotels_items = [item]
        elif item in bus_data_return + trains_data_return + flights_data_return:
            total_cost_return_transportation += item['price']
            return_transportation_items = [item]
        elif item in restaurants_data:
            total_cost_food += item['price'] * data["num_travelers"]
            restaurant_items.append(item)
        elif item in attractions_data:
            total_cost_attractions += item['price'] * data["num_travelers"]
            attractions_items.append(item)

total_cost_transportation_both = (total_cost_transportation + total_cost_return_transportation) * data["num_travelers"]
# Calculate the total cost including return transportation
total_cost = total_cost_transportation_both + total_cost_hotel + total_cost_food + total_cost_attractions


# Create a dictionary containing the itinerary and calculations
result = {
    'itinerary': {
        'transportation': transportation_items,
        'attraction': attractions_items,
        'hotels': hotels_items,
        'restaurants': restaurant_items,
        'return_transportation': return_transportation_items 
    },
    'total_cost': {
        'transportation': total_cost_transportation_both,
        'hotel': total_cost_hotel,
        'food': total_cost_food,
        'attractions': total_cost_attractions,
        'total': total_cost
    }
}

# Print the result to stdout
print(json.dumps(result))
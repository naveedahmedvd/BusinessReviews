import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Loader } from "@googlemaps/js-api-loader"
import 'react-autocomplete-input/dist/bundle.css';
import { setSelectedPlaceFromAutocomplete } from "../../Store/RestaurantsSlice";
import './home.css';
const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
});

let autocomplete;
let placesService;
let selectedCityLocation;


export default function SearchBar(props) {
    const dispatch = useDispatch();

    const [autocompleteList, setAutocompleteList] = useState([]);
    const handleChange = (e) => {
        const textSearchRequest = {
            query: e.target.value,
            type: 'restaurant',
            location: selectedCityLocation,
        }
        placesService.textSearch(textSearchRequest, (list) => {
            setAutocompleteList(list);
        });
    }
    const selectedFromRestaurants = (event, value) => {
        if (!value)
            return;
        const placeDetailsRequest = {
            placeId: value.place_id,
        }
        placesService.getDetails(placeDetailsRequest, (placeDetails) => {
            console.log(placeDetails);
            const restaurantName = placeDetails.name;
            const reducer = (previousValue, currentValue) => previousValue + ' ' + currentValue;
            const address = placeDetails.address_components.reduce(reducer, '');
            var photos = placeDetails.photos.map(x => x.getUrl());
            const details = {
                restaurantName,
                address,
                photos
            }
            console.log(details);
            dispatch(setSelectedPlaceFromAutocomplete(details));
        });
    }
    loader.load().then(() => {
        const div = document.getElementById("map");
        const map = new window.google.maps.Map(div, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        const countryRestrict = { country: "pk" };
        autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            {
                types: ["(cities)"],
                componentRestrictions: countryRestrict,
            }
        );
        autocomplete.addListener("place_changed", () => {
            const selectedCity = autocomplete.getPlace();
            setAutocompleteList([]);
            console.log(selectedCity);
            selectedCityLocation = new window.google.maps.LatLng(selectedCity.geometry.location.lat(), selectedCity.geometry.location.lng());
        });
        placesService = new window.google.maps.places.PlacesService(div);


    });

    return (
        <div>
            <div id='map'></div>
            <div className="locationField-container">
                <div className="locationField" style={{ width: "700px" }}>
                    <Autocomplete
                        id="restaurantSearch"
                        className="search-bar-google"
                        onChange={selectedFromRestaurants}
                        fullWidth={true}
                        options={autocompleteList}
                        getOptionLabel={option => `${option.name} ${option.formatted_address}`}
                        renderInput={(params) => <TextField onChange={handleChange} {...params} label="Search restaurants" />}
                    />
                </div>
                <div className="locationField">
                    <input id="autocomplete" className="search-bar-google css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" placeholder="Enter a city" type="text" />
                </div>
            </div>

        </div>

    )
}


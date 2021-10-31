import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Loader } from "@googlemaps/js-api-loader"
import 'react-autocomplete-input/dist/bundle.css';

const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
});

let autocomplete;
let placesService;
let selectedCityLocation;

export default function SearchBar(props) {
    const [autocompleteList, setAutocompleteList] = useState([]);
    const handleChange = (e) => {
        console.log('handle change called', e.target.value);
        const textSearchRequest = {
            query: e.target.value,
            type: 'restaurant',
            location: selectedCityLocation,
        }
        console.log(selectedCityLocation);
        placesService.textSearch(textSearchRequest, (list) => {
            const names = list.map(x => x.name);
            console.log(names);
            setAutocompleteList(names);
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
            console.log(selectedCity);
            selectedCityLocation = new window.google.maps.LatLng(selectedCity.geometry.location.lat(), selectedCity.geometry.location.lng());
        });
        placesService = new window.google.maps.places.PlacesService(div);


    });

    return (
        <div>
            <div id='map'></div>
            <div id="locationField">
                <Autocomplete
                    id="restaurantSearch"
                    freeSolo
                    fullWidth={false}
                    options={autocompleteList}
                    renderInput={(params) => <TextField onChange={handleChange} {...params} label="Search restaurants" />}
                />
                <input id="autocomplete" class="css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" placeholder="Enter a city" type="text" />
            </div>

        </div>

    )
}

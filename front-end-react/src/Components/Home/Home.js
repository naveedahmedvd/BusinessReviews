import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import applicationApi from '../../APIs/ApplicationApi';
import { apiSlice, useGetSetupStatusQuery } from '../../Store/apiSlice'
import { useSelector } from "react-redux";
// import AuthApi from '../../APIs/AuthApi';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import PlacesWithStandaloneSearchBox from './SearchBox'
import { Loader } from "@googlemaps/js-api-loader"
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    // version: "weekly",
    // ...additionalOptions,
    libraries: ['places']
});

let map;
let service;
let infowindow;
let autocomplete;
let placesService;
let selectedCityLocation;
const axios = require('axios');

export default function Home(props) {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSetupStatusQuery();
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
    const application = useSelector((state) => {
        return state.application.application
    })
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
    let appName = '';
    if (!isLoading) {
        if (isSuccess) {
            if (data.application && data.user) {
                // setApplicationName(data.application);
                console.log('opening home page');
                appName = data.application;
            }
            else if (!data.user) {
                //redirect
                console.log('redirecting to signup');
                props.history.push('/signup');
            }
            else if (!data.application) {
                //redirect
                console.log('redirecting to setup');
                props.history.push('/setup');
            }
        }
    }


    return (
        <div>
            <Navbar Title={appName} />
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


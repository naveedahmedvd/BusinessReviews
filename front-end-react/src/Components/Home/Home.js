import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import applicationApi from '../../APIs/ApplicationApi';
import { apiSlice, useGetSetupStatusQuery } from '../../Store/apiSlice'
import { useSelector } from "react-redux";
// import AuthApi from '../../APIs/AuthApi';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import PlacesWithStandaloneSearchBox from './SearchBox'
import { Loader } from "@googlemaps/js-api-loader"

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
const handleChange = (e) => {
    console.log('handle change called', e.target.value);
    const textSearchRequest = {
        query: e.target.value,
        type: 'restaurant',
        location: selectedCityLocation,
    }
    console.log(selectedCityLocation);
    placesService.textSearch(textSearchRequest, (list) => {
        console.log(list);
    });
}
export default function Home(props) {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSetupStatusQuery();
    const [value, setValue] = useState(null);
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
            console.log(selectedCity.geometry.location);
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
    if (value) {
        console.log(value);
        const placeId = value.value.place_id;


        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        xhr.send();
    }


    return (
        <div>
            <Navbar Title={appName} />
            <div id='map'></div>
            <div id="locationField">
                <input id="restaurantSearch" onChange={handleChange} placeholder="Search restaurants" type="text" /><input id="autocomplete" placeholder="Enter a city" type="text" />
            </div>

        </div>

    )
}


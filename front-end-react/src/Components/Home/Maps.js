import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Loader } from "@googlemaps/js-api-loader"
import { setSelectedPlaceFromAutocomplete } from "../../Store/RestaurantsSlice";
import PlacesService from "../../Services/PlacesService";
import './home.css';
const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
});

let placesService;

export default function Maps(props) {

    const { mapsLoader } = props;
    loader.load().then(() => {
        const div = document.getElementById("map");
        const map = new window.google.maps.Map(div, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        
        placesService = new window.google.maps.places.PlacesService(div);
        PlacesService.service = placesService;
        mapsLoader();
    });

    return (
        <div>
            <div id='map'></div>
        </div>
    )
}


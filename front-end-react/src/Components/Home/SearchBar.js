import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { setSelectedPlaceFromAutocomplete } from "../../Store/RestaurantsSlice";
import './home.css';
import Maps from './Maps';
import PlacesService from '../../Services/PlacesService'
let autocomplete;
let selectedCityLocation;

export default function SearchBar(props) {

    const { selected } = props;
    const dispatch = useDispatch();

    const [autocompleteList, setAutocompleteList] = useState([]);
    const loadAutocompleteUI = () => {

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
        // placesService = new window.google.maps.places.PlacesService(div);
    }

    const handleTextChangeRestaurantAutocomplete = (e) => {
        const textSearchRequest = {
            query: e.target.value,
            type: 'restaurant',
            location: selectedCityLocation,
        }
        PlacesService.service.textSearch(textSearchRequest, (list) => {
            setAutocompleteList(list);
        });
    }
    const selectedFromRestaurants = (event, value) => {
        if (!value)
            return;
        const placeDetailsRequest = {
            placeId: value.place_id,
        }
        PlacesService.service.getDetails(placeDetailsRequest, (placeDetails) => {
            console.log(placeDetails);
            var photos = placeDetails.photos.map(x => { return { url: x.getUrl() } });
            const latitude = placeDetails.geometry.location.lat();
            const longitude = placeDetails.geometry.location.lng();
            const details = {
                placeId: placeDetails.place_id,
                isActive: placeDetails.business_status === 'OPERATIONAL',
                restaurantName: placeDetails.name,
                address: placeDetails.formatted_address,
                photos,
                latitude,
                longitude,
                phone: placeDetails.formatted_phone_number,
                international_phone: placeDetails.international_phone_number,
                iconUrl: placeDetails.icon,
                iconBackgroundColor: placeDetails.icon_background_color,
                iconMaskUrl: placeDetails.icon_mask_base_uri,
                priceLevel: placeDetails.price_level,
                rating: placeDetails.rating,
                reviews: placeDetails.reviews ? placeDetails.reviews : [],
                types: placeDetails.types.reduce((a, b) => a + ' ' + b, '').trim(),
                googleUrl: placeDetails.url,
                userRatingsCount: placeDetails.user_ratings_total,
                utcOffset: placeDetails.utc_offset_minutes,
                website: placeDetails.website,
                timings: {
                    mondayOpeningHours: placeDetails.opening_hours?.periods[0]?.open?.hours,
                    mondayOpeningMinutes: placeDetails.opening_hours?.periods[0]?.open?.minutes,
                    mondayClosingHours: placeDetails.opening_hours?.periods[0]?.close?.hours,
                    mondayClosingMinutes: placeDetails.opening_hours?.periods[0]?.close?.minutes,

                    tuesdayOpeningHours: placeDetails.opening_hours?.periods[1]?.open?.hours,
                    tuesdayOpeningMinutes: placeDetails.opening_hours?.periods[1]?.open?.minutes,
                    tuesdayClosingHours: placeDetails.opening_hours?.periods[1]?.close?.hours,
                    tuesdayClosingMinutes: placeDetails.opening_hours?.periods[1]?.close?.minutes,

                    wednesdayOpeningHours: placeDetails.opening_hours?.periods[2]?.open?.hours,
                    wednesdayOpeningMinutes: placeDetails.opening_hours?.periods[2]?.open?.minutes,
                    wednesdayClosingHours: placeDetails.opening_hours?.periods[2]?.close?.hours,
                    wednesdayClosingMinutes: placeDetails.opening_hours?.periods[2]?.close?.minutes,

                    thursdayOpeningHours: placeDetails.opening_hours?.periods[3]?.open?.hours,
                    thursdayOpeningMinutes: placeDetails.opening_hours?.periods[3]?.open?.minutes,
                    thursdayClosingMinutes: placeDetails.opening_hours?.periods[3]?.close?.minutes,
                    thursdayClosingHours: placeDetails.opening_hours?.periods[3]?.close?.hours,

                    fridayOpeningHours: placeDetails.opening_hours?.periods[4]?.open?.hours,
                    fridayOpeningMinutes: placeDetails.opening_hours?.periods[4]?.open?.minutes,
                    fridayClosingHours: placeDetails.opening_hours?.periods[4]?.close?.hours,
                    fridayClosingMinutes: placeDetails.opening_hours?.periods[4]?.close?.minutes,

                    saturdayOpeningHours: placeDetails.opening_hours?.periods[5]?.open?.hours,
                    saturdayOpeningMinutes: placeDetails.opening_hours?.periods[5]?.open?.minutes,
                    saturdayClosingHours: placeDetails.opening_hours?.periods[5]?.close?.hours,
                    saturdayClosingMinutes: placeDetails.opening_hours?.periods[5]?.close?.minutes,

                    sundayOpeningHours: placeDetails.opening_hours?.periods[6]?.open?.hours,
                    sundayOpeningMinutes: placeDetails.opening_hours?.periods[6]?.open?.minutes,
                    sundayClosingHours: placeDetails.opening_hours?.periods[6]?.close?.hours,
                    sundayClosingMinutes: placeDetails.opening_hours?.periods[6]?.close?.minutes,
                }
            }
            //console.log(details);
            if (selected)
                selected(details);
            dispatch(setSelectedPlaceFromAutocomplete(details));
        });
    }

    return (
        <div className='searchbar-container'>
            <Maps mapsLoader={loadAutocompleteUI} />
            <div className="locationField-container">
                <div className="locationField" style={{ width: "700px" }}>
                    <Autocomplete
                        id="restaurantSearch"
                        className="search-bar-google"
                        onChange={selectedFromRestaurants}
                        fullWidth={true}
                        options={autocompleteList}
                        getOptionLabel={option => `${option.name} ${option.formatted_address}`}
                        renderInput={(params) => <TextField onChange={handleTextChangeRestaurantAutocomplete} {...params} label="Search restaurants" />}
                    />
                </div>
                <div className="locationField">
                    <input id="autocomplete" className="search-bar-google css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" placeholder="Enter a city" type="text" />
                </div>
            </div>

        </div>

    )
}


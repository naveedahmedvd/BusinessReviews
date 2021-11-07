
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Reviews from "./Reviews";
import PlacesService from "../../Services/PlacesService";
import Maps from "../Home/Maps";
export default function Restaurant(props) {
    const [photos, setPhotos] = useState([])
    const [mounted, setMounted] = useState(false)
    const [refreshed, setRefreshed] = useState(false)

    const { restaurant } = props;

    const imgStyle = {
        width: "100px",
        height: "100px"
    }
    const refreshDataFromGoogle = (placeId) => {
        if (refreshed)
            return;
        const placeDetailsRequest = {
            placeId
        }
        PlacesService.service.getDetails(placeDetailsRequest, (placeDetails) => {
            var photos = placeDetails.photos.map(x => { return { url: x.getUrl() } });
            setPhotos(photos);
            setRefreshed(true);
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
                reviews: placeDetails.reviews,
                types: placeDetails.types.reduce((a, b) => a + ' ' + b, '').trim(),
                googleUrl: placeDetails.url,
                userRatingsCount: placeDetails.user_ratings_total,
                utcOffset: placeDetails.utc_offset_minutes,
                website: placeDetails.website,
                timings: {
                    mondayOpeningHours: placeDetails.opening_hours.periods[0].open.hours,
                    mondayOpeningMinutes: placeDetails.opening_hours.periods[0].open.minutes,
                    mondayClosingHours: placeDetails.opening_hours.periods[0].close.hours,
                    mondayClosingMinutes: placeDetails.opening_hours.periods[0].close.minutes,

                    tuesdayOpeningHours: placeDetails.opening_hours.periods[1].open.hours,
                    tuesdayOpeningMinutes: placeDetails.opening_hours.periods[1].open.minutes,
                    tuesdayClosingHours: placeDetails.opening_hours.periods[1].close.hours,
                    tuesdayClosingMinutes: placeDetails.opening_hours.periods[1].close.minutes,

                    wednesdayOpeningHours: placeDetails.opening_hours.periods[2].open.hours,
                    wednesdayOpeningMinutes: placeDetails.opening_hours.periods[2].open.minutes,
                    wednesdayClosingHours: placeDetails.opening_hours.periods[2].close.hours,
                    wednesdayClosingMinutes: placeDetails.opening_hours.periods[2].close.minutes,

                    thursdayOpeningHours: placeDetails.opening_hours.periods[3].open.hours,
                    thursdayOpeningMinutes: placeDetails.opening_hours.periods[3].open.minutes,
                    thursdayClosingHours: placeDetails.opening_hours.periods[3].close.hours,
                    thursdayClosingMinutes: placeDetails.opening_hours.periods[3].close.minutes,

                    fridayOpeningHours: placeDetails.opening_hours.periods[4].open.hours,
                    fridayOpeningMinutes: placeDetails.opening_hours.periods[4].open.minutes,
                    fridayClosingHours: placeDetails.opening_hours.periods[4].close.hours,
                    fridayClosingMinutes: placeDetails.opening_hours.periods[4].close.minutes,

                    saturdayOpeningHours: placeDetails.opening_hours.periods[5].open.hours,
                    saturdayOpeningMinutes: placeDetails.opening_hours.periods[5].open.minutes,
                    saturdayClosingHours: placeDetails.opening_hours.periods[5].close.hours,
                    saturdayClosingMinutes: placeDetails.opening_hours.periods[5].close.minutes,

                    sundayOpeningHours: placeDetails.opening_hours.periods[6].open.hours,
                    sundayOpeningMinutes: placeDetails.opening_hours.periods[6].open.minutes,
                    sundayClosingHours: placeDetails.opening_hours.periods[6].close.hours,
                    sundayClosingMinutes: placeDetails.opening_hours.periods[6].close.minutes,
                }
            }

        });
    }

    if (!mounted) {
        console.log(restaurant);
        setPhotos(restaurant.photos);
        setMounted(true);
    }

    useEffect(() => {
        setMounted(true);
    }, [])
    const photosHtml = photos.map((x, idx) => <img style={imgStyle} key={idx} src={x.url} />)
    return (
        <div>
            <Maps mapsLoader={() => { refreshDataFromGoogle(restaurant.placeId); }} />
            <img src={restaurant.iconUrl} />

            <h1>
                {restaurant.restaurantName}
            </h1>
            <p>Address: {restaurant.address}</p>
            <Link to={{ pathname: restaurant.googleUrl }} target="_blank" >See on Map</Link>

            <br /> {photosHtml}
            <Reviews reviews={restaurant.reviews} />
        </div>

    )
}


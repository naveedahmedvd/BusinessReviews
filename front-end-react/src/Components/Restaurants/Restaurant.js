import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Reviews from "./Reviews";
import PlacesService from "../../Services/PlacesService";
import Maps from "../Home/Maps";
import './restaurant.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import { apiSlice } from "../../Store/apiSlice";
import { Rating } from "@mui/material";

export default function Restaurant(props) {
    const [removeRestaurant] = apiSlice.endpoints.removeRestaurant.useMutation();
    const [photos, setPhotos] = useState([])
    const [mounted, setMounted] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const { restaurant, index, onDelete } = props;

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
            if (!placeDetails) {
                const tmp = placeId;
                return;
            }

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
    const photosHtml = photos.slice(0, 5).map((x, idx) => <img style={imgStyle} key={idx} src={x.url} />)
    let ratingIconsList = [];
    for (let i = 0; i < restaurant.rating - 1; i++) {
        ratingIconsList.push(<FontAwesomeIcon icon={faStar} color={"red"} size={'1x'} />);
    }
    const ratingIcons = ratingIconsList.map((x, idx) => <FontAwesomeIcon icon={faStar} color={"red"} size={'1x'} key={idx} />);

    const history = useHistory();
    const clickHandle = () => {
        history.push(`/restaurant/${restaurant.restaurantId}`, restaurant);
    }

    const deleteRestaurant = (e) => {
        // console.log(`deleting ${restaurant.restaurantName}`);
        removeRestaurant(restaurant.restaurantId).then(x => {
            if (!x.error) {
                setDeleted(true);
                onDelete(restaurant.restaurantName);
            }

        })

    }
    return (
        <div hidden={deleted} className='rest-container'>
            <Maps mapsLoader={() => { refreshDataFromGoogle(restaurant.placeId); }} />
            <FontAwesomeIcon className='trash-icon' icon={faTrash} color={"red"} size={'1x'} onClick={deleteRestaurant} />
            <div className="title-box" onClick={clickHandle}>
                <img src={restaurant.iconUrl} className='icon-image' />

                <div>
                    <h2 className="rest-title">
                        {index + 1} - {restaurant.restaurantName}
                    </h2>
                    <div>Address: {restaurant.address}</div>
                    <div>Phone: {restaurant.phone}</div>
                    <Rating name="read-only" precision={0.5} value={restaurant.rating} readOnly />
                </div>
            </div>

            <Link to={{ pathname: restaurant.googleUrl }} target="_blank" ><FontAwesomeIcon icon={faMapMarkerAlt} color={"red"} size={'1x'} /> See on map</Link>

            <br /> {photosHtml}
            {/* <Reviews reviews={restaurant.reviews} /> */}
        </div>

    )
}


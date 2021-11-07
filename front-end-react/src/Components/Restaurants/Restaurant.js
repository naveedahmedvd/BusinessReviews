
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Reviews from "./Reviews";

export default function Restaurant(props) {

    const { restaurant } = props;
    console.log(props)
    const imgStyle = {
        width: "100px",
        height: "100px"
    }
    const photos = restaurant.photos.map((x, idx) => <img style={imgStyle} key={idx} src={x.url} />)
    return (
        <div>
            <img src={restaurant.iconUrl} />

            <h1>
                {restaurant.restaurantName}
            </h1>
            <p>Address: {restaurant.address}</p>
            <Link to={{ pathname: restaurant.googleUrl }} target="_blank" >See on Map</Link>

            <br /> {photos}
            <Reviews reviews={restaurant.reviews} />
        </div>

    )
}


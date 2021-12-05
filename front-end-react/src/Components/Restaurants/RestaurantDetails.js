

import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Button } from "@mui/material";
import store from "../../Store/store";
import { apiSlice } from "../../Store/apiSlice";

export default function RestaurantDetails(props) {

    const restaurant = props.location.state;
    console.log();
    return (
        <div>
            <Navbar Title={"App"} />
           <h1>
               {restaurant.restaurantName}
           </h1>
        </div>

    )
}


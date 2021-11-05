

import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Button } from "@mui/material";
import store from "../../Store/store";
import { apiSlice } from "../../Store/apiSlice";

export default function RestaurantDetails(props) {

    const [getRestaurants] = apiSlice.endpoints.getRestaurants.useQuery();

    return (
        <div>
            <Navbar Title={"App"} />
           <h1>
               Restaurant Details
           </h1>
        </div>

    )
}


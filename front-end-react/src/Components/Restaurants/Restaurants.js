


import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Button } from "@mui/material";
import store from "../../Store/store";
import { useGetRestaurantsQuery } from "../../Store/apiSlice";

export default function Restaurants(props) {

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRestaurantsQuery();

    if (isSuccess){
        console.log(data)
        debugger;
    }
    
    return (
        <div>
            <Navbar Title={"App"} />
            <h1>
                Restaurants
            </h1>
        </div>

    )
}


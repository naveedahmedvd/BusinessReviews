import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Button } from "@mui/material";
import store from "../../Store/store";
import { apiSlice } from "../../Store/apiSlice";

export default function AdminHome(props) {

    const [addRestaurant] = apiSlice.endpoints.addRestaurant.useMutation();

    const style = {
        padding: '-10px',
    }
    const saveHandle = () => {
        const selectedRestaurant = store.getState().restaurant.selectedPlaceFromAutocomplete;
        console.log(selectedRestaurant);
        addRestaurant(selectedRestaurant).then(x => {
            console.log('restaurant added',x);
        })
    }

    return (
        <div>
            <Navbar Title={"Admin Panel"} />

            <div>
                <SearchBar />
            </div>
            <Button onClick={saveHandle} variant="contained">Save</Button>
        </div>

    )
}


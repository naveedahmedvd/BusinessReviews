


import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Restaurant from "./Restaurant";

import { useGetRestaurantsQuery } from "../../Store/apiSlice";

export default function Restaurants(props) {

    let list;
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRestaurantsQuery();

    if (isSuccess) {
        console.log(data)
        list = data.map((x, idx) => <Restaurant key={idx} restaurant={x} />)

    }

    return (
        <div>
            <Navbar Title={"App"} />
            <h1>
                Restaurants
            </h1>
            {list}
        </div>

    )
}


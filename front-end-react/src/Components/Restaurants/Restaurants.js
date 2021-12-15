


import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Restaurant from "./Restaurant";

import { useGetRestaurantsQuery } from "../../Store/apiSlice";
import AlertMessage from "../Shared/AlertMessage";
export default function Restaurants(props) {
    const [message, setMessage] = useState('');
    const [cssClass, setCssClass] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    let list;
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRestaurantsQuery({ page: 1, name: '', priceLevels: [], ratings: [], timings: [] });

    const onDelete = (name) => {
        setMessage(`restaurant deleted - ${name}`);
        setCssClass('success');
        setShowMessage(true);
    }

    if (isSuccess) {
        list = data.restaurants.map((x, idx) => <Restaurant key={idx} restaurant={x} index={idx} onDelete={onDelete} />)
    }


    return (
        <div>
            <Navbar Title={"App"} />
            <AlertMessage cssClass={cssClass} message={message} visible={showMessage} />
            <h1>
                Restaurants
            </h1>
            {list}
        </div>

    )
}


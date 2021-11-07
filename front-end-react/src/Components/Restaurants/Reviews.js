



import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Restaurant from "./Restaurant";

import { useGetRestaurantsQuery } from "../../Store/apiSlice";
import Review from "./Review";

export default function Reviews(props) {

    const { reviews } = props;

    const list = reviews.map((review, idx) => <Review review={review} key={idx} />)

    return (
        <div>
            {list}
        </div>

    )
}


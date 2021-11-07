

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";

export default function Review(props) {

    const { review } = props;
    const commentStyle = {
        fontFamily: "Arial",
        color: "brown",
        textAlign: "left",
        padding: "10px"
    }
    return (
        <div style={commentStyle}>
            {review.author_name} said
            <p >{review.text}</p>

        </div>

    )
}


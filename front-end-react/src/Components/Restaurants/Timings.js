

import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navigation/Navbar";

export default function Timings(props) {

    const { timings } = props;

    return (
        <div>
            <Typography variant="body1">{timings.mondayOpeningHours > 0 && timings.mondayClosingHours > 0 && `Monday - ${timings.mondayOpeningHours}:${timings.mondayOpeningMinutes} - ${timings.mondayClosingHours}:${timings.mondayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.tuesdayOpeningHours > 0 && timings.tuesdayClosingHours > 0 && `Tuesday - ${timings.tuesdayOpeningHours}:${timings.tuesdayOpeningMinutes} - ${timings.tuesdayClosingHours}:${timings.tuesdayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.wednesdayOpeningHours > 0 && timings.wednesdayClosingHours > 0 && `Wednesday - ${timings.wednesdayOpeningHours}:${timings.wednesdayOpeningMinutes} - ${timings.wednesdayClosingHours}:${timings.wednesdayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.thursdayOpeningHours > 0 && timings.thursdayClosingHours > 0 && `Thursday - ${timings.thursdayOpeningHours}:${timings.thursdayOpeningMinutes} - ${timings.thursdayClosingHours}:${timings.thursdayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.fridayOpeningHours > 0 && timings.fridayClosingHours > 0 && `Friday - ${timings.fridayOpeningHours}:${timings.fridayOpeningMinutes} - ${timings.fridayClosingHours}:${timings.fridayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.saturdayOpeningHours > 0 && timings.saturdayClosingHours > 0 && `saturday - ${timings.saturdayOpeningHours}:${timings.saturdayOpeningMinutes} - ${timings.saturdayClosingHours}:${timings.saturdayClosingMinutes}`}</Typography>
            <Typography variant="body1">{timings.sundayOpeningHours > 0 && timings.sundayClosingHours > 0 && `sunday - ${timings.sundayOpeningHours}:${timings.sundayOpeningMinutes} - ${timings.sundayClosingHours}:${timings.sundayClosingMinutes}`}</Typography>
        </div>

    )
}


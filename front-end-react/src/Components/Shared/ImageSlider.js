import React, { useState } from "react";
import { Button, Container, Paper } from "@mui/material";
import Carousel from 'react-material-ui-carousel';


const ImageSlider = props => {
    const imagesUrl = props.imagesUrl;
    return (
        <Carousel next={() => { }} prev={() => { }} navButtonsAlwaysVisible={true}>
            {
                imagesUrl.map((url, i) => <Paper><img style={{ height: '800px', width: '100%' }} src={`${url}`}></img></Paper>)
            }
        </Carousel>
    );

};

export default ImageSlider;
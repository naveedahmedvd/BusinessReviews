import React, { useState } from "react";
import { useEffect, useRef } from "react";

import Navbar from "../Navigation/Navbar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import applicationApi from '../../APIs/ApplicationApi';
import { apiSlice, useGetSetupStatusQuery } from '../../Store/apiSlice'
import { useSelector } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader"
import 'react-autocomplete-input/dist/bundle.css';
import SearchBar from "./SearchBar";

import {
    useComponentDidMount,
    useComponentDidUpdate,
    useComponentWillUnmount
} from '../../Utils/Utils';

export default function Home(props) {
    const [mounted, setMounted] = useState(false)
    let appName = '';
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSetupStatusQuery();
    if (!mounted) {
        // Code for componentWillMount here
        // This code is called only one time before intial render


        // const application = useSelector((state) => {
        //     return state.application.application
        // })

        if (!isLoading) {
            if (isSuccess) {
                if (data.application && data.user) {
                    // setApplicationName(data.application);
                    console.log('opening home page');
                    appName = data.application;
                }
                else if (!data.user) {
                    //redirect
                    console.log('redirecting to signup');
                    props.history.push('/signup');
                }
                else if (!data.application) {
                    //redirect
                    console.log('redirecting to setup');
                    props.history.push('/setup');
                }
            }
        }
    }

    useEffect(() => {
        setMounted(true);
    }, [])




    return (
        <div>
            <Navbar Title={appName} />
            <SearchBar />
        </div>

    )
}


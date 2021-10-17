import React, {useState} from "react";
import Navbar from "../Navigation/Navbar";
import applicationApi from '../../APIs/ApplicationApi';
import { apiSlice, useGetSetupStatusQuery } from '../../Store/apiSlice'
import { useSelector } from "react-redux";
import AuthApi from '../../APIs/AuthApi';
export default function Home(props) {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSetupStatusQuery();
    const application = useSelector((state) => {
        return state.application.application
    })
    let appName = '';
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

    return (
        <div>
            <Navbar Title={appName} />
            <div>
                <br/>
            </div>
        </div>

    )
}


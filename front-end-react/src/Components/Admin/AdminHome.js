import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";


export default function AdminHome(props) {
    

    


    return (
        <div>
            <Navbar Title={"Admin Panel"} />
            <SearchBar />
        </div>

    )
}


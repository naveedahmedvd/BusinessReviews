import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Button } from "@mui/material";
import store from "../../Store/store";
import { apiSlice } from "../../Store/apiSlice";
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import './admin.css'
import AlertMessage from "../Shared/AlertMessage";

export default function AdminHome(props) {

    const [addRestaurant] = apiSlice.endpoints.addRestaurant.useMutation();
    const [image, setImage] = useState('');
    const [imageList, setimageList] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const [message, setMessage] = useState('');
    const [cssClass, setCssClass] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const onPick = (_image) => {
        setImage(_image);
    }
    const style = {
        padding: '-10px',
    }

    const saveHandle = () => {
        const restaurant = { ...selectedRestaurant };

        restaurant.iconUrl = image.src
        addRestaurant(restaurant).then(x => {
            if (!x.error) {
                console.log('restaurant added', x);
                setMessage('restaurant added');
                setCssClass('success');
                setShowMessage(true);
                window.location.reload();
                // setTimeout(() => { window.location.reload(); }, 6000);
            }
            else {
                alert('something went wrong');
            }

        })
            .catch(err => {
                alert('something went wrong');
            });

    }

    const selectedHandler = (data) => {
        console.log('selected', data);
        setSelectedRestaurant(data);
        setimageList(data.photos.map(x => x.url));
    }
    const getBase64Image = (img) => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }


    return (
        <div>
            <Navbar />
            <AlertMessage cssClass={cssClass} message={message} visible={showMessage} />
            {/* <AlertMessage cssClass={'error'} message={'restaurant added successfully'} visible={true} /> */}
            <h1>Admin</h1>

            <div>
                <SearchBar selected={selectedHandler} />
            </div>
            <img className='selectedImage' id='selectedImage' src={image.src} hidden={!image} />
            <ImagePicker
                images={imageList.map((image, i) => ({ src: image, value: i }))}
                onPick={onPick}
            />
            <Button className='save-button' onClick={saveHandle} disabled={!image} variant="contained">Save</Button>
        </div>

    )
}


import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector } from "react-redux";
import SearchBar from "../Home/SearchBar";
import { Container, Paper, Card, CardHeader, CardContent, Typography, Box, CardMedia, Rating, Grid, List, ListItem, Divider, Link, TextField, Alert, AlertTitle } from "@mui/material";
import store from "../../Store/store";
import { apiSlice } from "../../Store/apiSlice";
import ImageSlider from "../Shared/ImageSlider";
import { getDummyRestaurants, addReview, toggleFollow } from "../../Data/RestaurantTestData";
import { Avatar, Button, CardActionArea, CardActions, ListItemIcon, ListItemText } from "@material-ui/core";
import LinkIcon from '@mui/icons-material/Link';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import DirectionsIcon from '@material-ui/icons/Directions';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from "../Shared/FormDialog";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Timings from "./Timings";
import Carousel from "../Shared/Carousel";

export default function RestaurantDetails(props) {

    // const [getRestaurants] = apiSlice.endpoints.getRestaurants.useQuery();
    // const restaurant = getDummyRestaurants(0);
    const restaurant = props.location.state;
    const [openForm, setOpenForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [error, setError] = useState(null);
    const [follow, setFollow] = useState(restaurant.followedByLoggedInUser);

    const review_UserNameRef = useRef();
    const review_LocationRef = useRef();
    const review_RatingRef = useRef();
    const review_CommentsRef = useRef();

    const openFormDialogHandler = () => {
        setOpenForm(true);
    };

    const closeFormDialogHandler = () => {
        setOpenForm(false);
    };

    useEffect(() => {
        const timeoutIdentifier = setTimeout(() => {
            setError(null);
        }, 2000);
        return () => {
            clearTimeout(timeoutIdentifier);
        }
    }, [error]);

    const submitFormDialogHandler = () => {
        if (!review_UserNameRef.current.value) {
            setError({ message: 'User Name is required.' });
            return;
        }
        if (!review_LocationRef.current.value) {
            setError({ message: 'Location is required.' });
            return;
        }
        if (!(review_RatingRef.current.value > 0)) {
            setError({ message: 'Rating is required.' });
            return;
        }
        if (!review_CommentsRef.current.value) {
            setError({ message: 'Comments is required.' });
            return;
        }
        const newReview = {
            userName: review_UserNameRef.current.value,
            location: review_LocationRef.current.value,
            rating: review_RatingRef.current.value,
            comments: review_CommentsRef.current.value
        };
        console.log(newReview);
        addReview(newReview);
        setOpenForm(false);
    }

    const followClickHandler = () => {
        toggleFollow();
        setFollow(restaurant.followedByLoggedInUser);
    };

    return (
        <>
            <FormDialog open={openForm} title={`${restaurant.restaurantName}`} cancelButtonText='Cancel' submitButtonText='Add' onClose={closeFormDialogHandler} onSubmit={submitFormDialogHandler}>
                {error && <Alert style={{ backgroundColor: '#FDEDED' }} onClose={() => {
                    setError(null);
                }} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>}
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        marginTop: '3%'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={review_UserNameRef}
                                style={{ width: '80%' }}
                                required
                                id="username"
                                label="User Name"
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={review_LocationRef}
                                style={{ width: '80%' }}
                                required
                                id="location"
                                label="Location"
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                name="rating"
                                type="number"
                                value={reviewRating}
                                ref={review_RatingRef}
                                hidden
                                readOnly
                            />
                            <Rating id="rating" size="large" precision={0.5} name="read-only"
                                onChange={(_, value) => {
                                    setReviewRating(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={review_CommentsRef}
                                style={{ width: '80%' }}
                                id="comments"
                                label="Comments"
                                multiline
                                rows={5}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </FormDialog>
            <Grid container spacing={2} style={{ backgroundColor: '#bababa' }} >
                <Grid item xs={12}>
                    <Navbar Title={"App"} />
                </Grid>
                <Grid item xs={12}>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Carousel show={4} infiniteLoop withIndicator>
                            {restaurant.photos.map((x, idx) => <img src={x.url} key={idx} alt="placeholder" style={{ height: '300px' }} />)}
                        </Carousel>
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={7}>
                    <Card>
                        <CardContent sx={{ width: '800px', height: '350px', display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 500 }}
                                image={restaurant.iconUrl}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <CardContent style={{ alignItems: "center", justify: "center" }}>
                                    <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700 }} variant="h2" component="div" color="text.primary">
                                        {restaurant.restaurantName}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        <Rating name="read-only" precision={0.5} value={restaurant.rating} readOnly />
                                        <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' }} variant="h6" component="div" color="text.primary">{` ${restaurant.reviews?.length} Reviews`}</Typography>
                                    </Box>
                                    <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' }} variant="body2" color="text.secondary">
                                        {restaurant.address}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </CardContent>
                        <CardContent style={{ display: 'flex', gap: 10 }}>
                            <Button style={{ width: '20%' }} color="secondary" variant="contained" onClick={openFormDialogHandler}><StarBorderIcon></StarBorderIcon> Write Review</Button>
                            {follow ? <Button style={{ width: '20%' }} variant="contained" onClick={followClickHandler}><BookmarkBorderIcon></BookmarkBorderIcon>Follow</Button>
                                : <Button style={{ width: '20%' }} variant="contained" onClick={followClickHandler}><BookmarkIcon></BookmarkIcon>Following</Button>}
                        </CardContent>
                        <Divider variant="fullWidth" component="div" />
                        <CardContent>
                            <Typography align='left' style={{ fontSize: 25, fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700 }} component='h1'>Hours</Typography>
                            <List>
                                <Timings timings={restaurant.timings} />
                            </List>
                        </CardContent>
                        <Divider variant="fullWidth" component="div" />
                        {restaurant.reviews.map((x, idx) => <>
                            <Card key={idx}>
                                <CardHeader style={{ marginLeft: '2px' }}
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            {x.profile_photo_url}
                                        </Avatar>
                                    }
                                    subheader={<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left', pl: 1, pb: 1 }}>
                                        <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700 }} color="text.primary">{x.author_name}</Typography>
                                        <Rating size="small" precision={0.5} name="read-only" value={x.rating} readOnly />
                                        <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: 11, fontWeight: 400 }} color="text.primary">{x.relative_time_description}</Typography></Box>}
                                />
                                <CardContent> <Typography align='left' style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' }} flexWrap variant="body2" color="text.secondary">
                                    {x.text}</Typography></CardContent>
                            </Card>
                            <Divider variant="fullWidth" component="div" /></>)}
                    </Card>
                </Grid>
                <Grid item xs={4} style={{ position: 'fixed', top: '43%', left: '70%' }}>
                    <Grid container xs={12} spacing={4}>
                        <Grid item xs={12}>
                            <Card>

                                <CardContent>
                                    <Typography align="left" style={{ fontSize: 25, fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700 }}>
                                        Order Food
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Button style={{ width: '100%' }} color="primary" variant="contained">Order Now</Button>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <List>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText primary={<Link fontSize={12} href="#">{restaurant.website}</Link>} />
                                        <ListItemIcon><LinkIcon></LinkIcon></ListItemIcon>
                                    </ListItem>
                                    <Divider variant="fullWidth" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemText primary={restaurant.international_phone} />
                                        <ListItemIcon><PhoneInTalkIcon></PhoneInTalkIcon></ListItemIcon>
                                    </ListItem>
                                    <Divider variant="fullWidth" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={<Link href="#">Get Direction</Link>}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {restaurant.address}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemIcon><DirectionsIcon></DirectionsIcon></ListItemIcon>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
};

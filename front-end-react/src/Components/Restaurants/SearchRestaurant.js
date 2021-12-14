import { ToggleButtonGroup, ToggleButton, CircularProgress, Card, CardContent, CardHeader, CardMedia, Checkbox, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Rating, TextField, Typography, Paper, Container } from "@mui/material";
import { Box, typography } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetRestaurantsQuery } from "../../Store/apiSlice";
import Navbar from "../Navigation/Navbar";

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ratings = ['1.0 - 1.9', '2.0 - 2.9', '3.0 - 3.9', '4.0 - 5.0'];
const timings = ['08:00 AM - 11:00 AM', '12:00 PM - 05:00 PM', '06:00 PM - 12:00 AM']

const SearchRestaurant = () => {

    const [searchRestuarantByName, setSearchRestuarantByName] = useState('');
    const [priceLevels, setPriceLevels] = useState([]);
    const [ratingsFilter, setRatingsFilter] = useState([]);
    const [timingsFilter, setTimingsFilter] = useState([]);
    const { data, isSuccess, isLoading } = useGetRestaurantsQuery({ page: 1, name: searchRestuarantByName, priceLevels: priceLevels, ratings: ratingsFilter, timings: timingsFilter });
    // var today = new Date();
    // var dayName = days[today.getDay()];

    const priceLevelToggleHandler = (event, newPriceLevel) => {
        setPriceLevels(newPriceLevel);
    };

    const ratingsToggleHandler = (value) => () => {
        // const str = value.replace(/\s/g, '');
        const currentIndex = ratingsFilter.indexOf(value);
        const newChecked = [...ratingsFilter];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setRatingsFilter(newChecked);
    };

    const timingToggleHandler = (value) => () => {
        const currentIndex = timingsFilter.indexOf(value);
        const newChecked = [...timingsFilter];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setTimingsFilter(newChecked);
    };

    const searchChangeHandler = (event) => {
        setSearchRestuarantByName(event.target.value);
    };


    let list = [];
    if (isSuccess) {
        list = data.map(x => <Card>
            <CardContent sx={{ width: '800px', height: '250px', display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 200, height: 200 }}
                    image={x.iconUrl}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CardContent style={{ alignItems: "center", justify: "center" }}>
                        <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 700 }} variant="h4" component="div" color="text.primary">
                            {x.restaurantName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <Rating name="read-only" precision={0.5} value={x.rating} readOnly />
                            <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' }} variant="h6" component="div" color="text.primary">{` ${x.reviews?.length} Reviews`}</Typography>
                        </Box>
                        <Typography style={{ fontFamily: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' }} variant="body2" color="text.secondary">
                            {x.address}
                        </Typography>
                    </CardContent>
                </Box>
            </CardContent>
            <Divider variant="fullWidth" component="div" />
        </Card>);
    }

    return (<div>
        <Navbar Title={"App"} />
        <h1>
            Restaurants
        </h1>
        {isLoading && <CircularProgress />}
        {
            !isLoading && <Grid container spacing={2} style={{ backgroundColor: '#bababa' }} >
                <Grid item xs={4}></Grid>
                <Grid item xs={7}>
                    <Box sx={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                        <TextField
                            id="filled-search"
                            label="Search Restaurants"
                            type="search"
                            variant="filled"
                            sx={{ width: '100%' }}
                            onChange={searchChangeHandler}
                            value={searchRestuarantByName}
                        />
                    </Box>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={4}>
                    <Grid item xs={12} sx={{ position: 'fixed', width: '33%', top: 150 }}>
                        <Paper sx={{ maxWidth: 450 }}><Typography sx={{ paddingLeft: 2, paddingBottom: 4, paddingTop: 2 }} fontSize={20} fontWeight={800}>Filters</Typography></Paper>
                        <Divider variant="fullWidth" component="div" />
                        <Paper sx={{ maxWidth: 450 }}>
                            <ToggleButtonGroup
                                sx={{ margin: 2, paddingLeft: 10 }}
                                value={priceLevels}
                                onChange={priceLevelToggleHandler}
                                aria-label="text formatting"
                            >
                                <ToggleButton value="1">
                                    $
                                </ToggleButton>
                                <ToggleButton value="2">
                                    $$
                                </ToggleButton>
                                <ToggleButton value="3">
                                    $$$
                                </ToggleButton>
                                <ToggleButton value="4">
                                    $$$$
                                </ToggleButton>
                            </ToggleButtonGroup>

                        </Paper>
                        <Divider variant="fullWidth" component="div" />
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2 }} fontWeight={800}>Ratings</Typography>
                            <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
                                {ratings.map((x, index) =>
                                    <ListItem
                                        key={index}
                                        disablePadding
                                    >

                                        <ListItemButton role={undefined} onClick={ratingsToggleHandler(x)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={ratingsFilter.indexOf(x) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': index }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={index} primary={x} />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        {/* <Divider variant="fullWidth" component="div" />
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography sx={{ paddingTop: 2, paddingLeft: 2 }} fontWeight={800}>{dayName} timings</Typography>
                            <List sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
                                {timings.map((x, index) =>
                                    <ListItem
                                        key={index}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={timingToggleHandler(x)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={timingsFilter.indexOf(x) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': index }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={index} primary={x} />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </Paper> */}
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    {list}
                    <Card>
                        <CardContent>
                            <Pagination size="large" count={10} color="primary" />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        }
    </div >)
};

export default SearchRestaurant;
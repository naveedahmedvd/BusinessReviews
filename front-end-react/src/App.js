import logo from './logo.svg';
import './App.scss';
import { Button } from '@material-ui/core';
import '@fontsource/roboto';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import Navbar from './Components/Navigation/Navbar'
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SignUp from './Components/Setup/signup';
import Setup from './Components/Setup/setup';
import Login from './Components/Auth/login';
import AdminHome from './Components/Admin/AdminHome';
import Restaurants from './Components/Restaurants/Restaurants';
import RestaurantDetails from './Components/Restaurants/RestaurantDetails';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchRestaurant from './Components/Restaurants/SearchRestaurant';

function App() {
  return (
    <div className="App">
      {/* <Button variant="contained" color="primary" disableElevation>
        Disable elevation
      </Button>
      <AccessAlarmIcon/> */}
      <Router>
        <div>
          <Switch>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/setup" component={Setup}></Route>
            <Route path="/Admin" component={AdminHome}></Route>
            {/* <Route path="/restaurants" component={Restaurants}></Route> */}
            <Route path="/restaurants" component={SearchRestaurant}></Route>
            <Route path="/restaurant/:id" component={RestaurantDetails}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

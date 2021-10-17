import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_API_URL;

const getToken = ()=>{
    return axios.get(`${baseurl}/account/token`).then(x=>x.data);
}

export default {
    getToken,
}
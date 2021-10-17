import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_API_URL;

const getApplications = ()=>{
    return axios.get(`${{baseurl}}/application`).then(x=>x.data);
}

export default {
    getApplications,
}
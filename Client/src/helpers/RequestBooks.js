import axios from "axios";

const RequestBooks = axios.create({

baseURL: 'https://api.mrkive.site' })

export default RequestBooks
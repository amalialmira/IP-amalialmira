import axios from "axios";

const RequestBooks = axios.create({

baseURL: 'http://localhost:3000' })

export default RequestBooks
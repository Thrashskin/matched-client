import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });

        this.service = service;
    }

    signup = (email, password, kind) => {
        return this.service.post('/signup', {email, password, kind}) //remember, this is actually an axios request.
        .then(response => response.data);
    }

    login = (email, password) => {
        return this.service.post('login', {email, password})
        .then(response => response.data
            )
        .catch(error => {
            console.log(error.response.data)
            return error
        })
    }

    logout = () => {
        return this.service.get('/logout', {})
        .then(response => {
            console.log(response.data);
            return response.data
        })
        .catch(error => {
            return error;
        })
    }

    createOffer = (newOffer) => {
        return this.service.post('offer', newOffer)
        .then( response =>  response)
        .catch(error => error);
    }

    getOffers = (companyID) => { //MAYBE this one doesn't need to be done through the service.
        return this.service.get(`${companyID}/offers`)
        .then(response => response)
        .catch(error => error)
    }

    getOfferDetails = (offerID) => {
        return this.service.get(`offer/${offerID}`)
        .then(response => response)
        .catch(error => error)
    }
       
}

export default AuthService;
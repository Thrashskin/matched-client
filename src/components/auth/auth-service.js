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

    getProfile = (userKind, userID) => {
        return this.service.get(`/${userKind}/${userID}`)
        .then(response => response.data)
        .catch(error => console.log(error))
    }

    editProfile = (userKind, userID, updatedProfile) => {
        
        return this.service.put(`/${userKind}/${userID}`, updatedProfile)
        .then(response => console.log(response))
        .catch(error => console.log(error))
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
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    editOffer = (offerID, editedOffer) => {
        return this.service.put(`/offer/${offerID}`, editedOffer)
        .then(response => response)
        .catch(error => error)
    } 
    
    deleteOffer = (offerID) => {
        return this.service.delete(`/offer/${offerID}`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    applyToOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/apply`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    saveOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/save`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }
}

export default AuthService;
import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://match3d.herokuapp.com',
            withCredentials: true
        });

        this.service = service;
    }

    signup = (email, password, kind) => {
        return this.service.post('/signup', {email, password, kind}) //remember, this is actually an axios request.
        .then(response => response.data)
        .catch(error => error.response.data);
    }

    login = (email, password) => {
        return this.service.post('login', {email, password})
        .then(response => response.data)
        .catch(error => {
            //console.log(error.response.data)
            return error.response.data
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

    getAllOffers = () => {
        return this.service.get('/offers/all')
        .then(response => response)
        .catch(error => error)
    }

    getApplications = (seekerID) => { 
        return this.service.get(`/${seekerID}/applications`)
        .then(response => response)
        .catch(error => error)
    }


    getSavedOffers = (seekerID) => { //MAYBE this one doesn't need to be done through the service.
        return this.service.get(`/${seekerID}/saved`)
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

    rejectOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/reject`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    getCandidates = (offerID) => {
        return this.service.get(`/offer/${offerID}/candidates`)
        .then(response => response.data)
        .catch(error => error)
    }

    renderChat = (participants) => {
        //If there is no existing chat between these two participants
        //one will be created and returned as response.
        //Otherwise, the existing chat will be returned.

        //participants is an object containing a company ID and a seeker ID.
        return this.service.post('/chats/create', participants)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    getChatByID = (chatID) => {
        return this.service.get(`/chats/${chatID}`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => error)
    }

    submitMessage = (chatID, message) => {
        return this.service.post(`/chats/${chatID}/createMessage`, message)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => console.log(error));
    }

    getMyMessages = (userID) => {
        return this.service.get(`/${userID}/chats`)
        .then(response => response)
        .catch(error => error)
    }
}

export default AuthService;
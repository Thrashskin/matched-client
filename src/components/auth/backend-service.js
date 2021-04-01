import axios from 'axios';

class BackEndService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api`,
            withCredentials: true
        });

        this.service = service;
    }

    signup = (email, password, kind) => {
        return this.service.post('/signup', {email, password, kind}) 
        .then(response => response.data)
        .catch(error => error.response.data);
    }

    login = (email, password) => {
        return this.service.post('login', {email, password})
        .then(response => response.data)
        .catch(error => {
            return error.response.data
        })
    }

    logout = () => {
        return this.service.get('/logout', {})
        .then(response => {
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
        .then(response => response)
        .catch(error => error)
    }

    createOffer = (newOffer) => {
        return this.service.post('offer', newOffer)
        .then( response =>  response)
        .catch(error => error);
    }

    getOffers = (companyID) => { 
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


    getSavedOffers = (seekerID) => { 
        return this.service.get(`/${seekerID}/saved`)
        .then(response => response)
        .catch(error => error)
    }
   
    getOfferDetails = (offerID) => {
        return this.service.get(`offer/${offerID}`)
        .then(response => {
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
            return response
        })
        .catch(error => error)
    }

    applyToOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/apply`)
        .then(response => {
            return response
        })
        .catch(error => error)
    }

    saveOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/save`)
        .then(response => {
            return response
        })
        .catch(error => error)
    }

    rejectOffer = (offerID) => {
        return this.service.put(`/offer/${offerID}/reject`)
        .then(response => {
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
            return response
        })
        .catch(error => error)
    }

    getChatByID = (chatID) => {
        return this.service.get(`/chats/${chatID}`)
        .then(response => {
            return response
        })
        .catch(error => error)
    }

    submitMessage = (chatID, message) => {
        return this.service.post(`/chats/${chatID}/createMessage`, message)
        .then(response => {
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

export default BackEndService;
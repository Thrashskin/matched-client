import React from 'react';
import {Link} from 'react-router-dom';
import AuthService from './auth/auth-service';

export default class OfferList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offers: []
        }

        this.service = new AuthService();
    }

    componentDidMount() {
        this.service.getOffers(this.props.loggedInUser._id)
        .then(response => {
            this.setState({
                offers: response.data
            })
        })
        .catch(error => console.log(error));
    }
    
    render() {

        let offersToRender = this.state.offers.map( (offer, index) => {
           return ( <li key={index}>
                         <Link to={`/offers/${offer._id}`}><h5>{offer.title}</h5></Link>
                         <p>{offer.stack}</p>
                    </li>)
        })

        return (
            (this.state.offers) ? 
                <ul>
                    {[offersToRender]}
                </ul>
                :
                <p>You haven't published any offer yet. Do you want to <Link to='offers/add-offer'>public one?</Link></p>
        )
    }
}

import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';

export default class OfferList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offers: []
        }

        this.service = new AuthService();
        this.path = this.props.match.path
    }

    componentDidMount() {

        if (this.path.includes('offer')) {

            this.service.getOffers(this.props.loggedInUser._id)
                .then(response => {
                    this.setState({
                        offers: response.data
                    })
                })
                .catch(error => console.log(error));
        } else if (this.path.includes('applications')) {
            this.service.getApplications(this.props.loggedInUser._id)
                .then(response => {
                    this.setState({
                        offers: response.data
                    })
                })
                .catch(error => console.log(error));
        } else if (this.path.includes('saved')) { 

            this.service.getSavedOffers(this.props.loggedInUser._id)
                .then(response => {
                    this.setState({
                        offers: response.data
                    })
                })
                .catch(error => console.log(error));
        }
    }

    render() {

        const offersToRender = this.state.offers.map((offer, index) => {
            return (<li key={index}>
                <Link to={`/offers/${offer._id}`}><h5>{offer.title}</h5></Link>
                <p>{offer.stack}</p>
            </li>)
        })

        const MessageToRender = () => {
            if (this.path.includes('offer')) {
                return <p>You haven't published any offer yet. Do you want to <Link to='offers/add-offer'>public one?</Link></p>
            } else if (this.path.includes('applications')) {
                return <p>You haven't applied to any offer yet</p>
            } else if (this.path.includes('saved')) { 
                return <p>You haven't saved any offer yet</p>
            } 
        }

        return (
            (this.state.offers) ?
                <ul>
                    {[offersToRender]}
                </ul>
                :
                <MessageToRender/>
        )
    }
}

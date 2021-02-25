import React from 'react'
import {Link} from 'react-router-dom'
import AuthService from './auth/auth-service'

export default class OfferList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offers: []
        }

        this.service = new AuthService();
    }

    componentDidMount() {
        //console.log(this.props.loggedInUser._id)
        this.service.getOffers(this.props.loggedInUser._id)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    render() {
        return (
            this.state.offers ? 
                <ul>
                    {[this.state.offers].map( offer => {
                        <li>
                            <p>{offer}</p>
                        </li>
                    })}
                </ul>
                :
                <p>You haven't published any offer yet. Do you want to <Link to='offers/add-offer'>public one?</Link></p>
        )
    }
}

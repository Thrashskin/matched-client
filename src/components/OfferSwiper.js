import React from 'react'
import Offer from './Offer';
import AuthService from './auth/auth-service'
import './OfferSwiper.css'

export default class OfferSwiper extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            offersToShow: []
        }

        this.service = new AuthService();

    }

    componentDidMount() {

        this.service.getAllOffers()
            .then(response => {
                console.log(response.data)
                this.setState({
                    offersToShow: response.data
                })
            })
            .catch(error => console.log(error))
    }

    removeFromArray = (offerID) => {
        //TODO: Based on the logic of this element removing only the first element would be enough.
        let offersCopy = [...this.state.offersToShow]
        offersCopy.splice(offersCopy.indexOf(offerID), 1)
        this.setState({
            offersToShow: offersCopy
        });
    }

    render() {
        //console.log(this.props)

        if (this.props.userInSession && this.props.userInSession.kind === 'Seeker') {
            if (this.state.offersToShow.length > 0) {
                console.log(this.state.offersToShow[0])
                return (
                    <div className="OfferSwiper">
                        <Offer userInSession={this.props.userInSession} currentOffer={this.state.offersToShow[0]} removeFromArray = {this.removeFromArray}/>
                    </div>
                );
            } else {
                return <p>Sorry, there are no offers matching your current prefferences =(</p>
            }

        } else {
            return null
        }
    }
}



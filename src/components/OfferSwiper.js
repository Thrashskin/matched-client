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

        if (this.props.userInSession) {
            this.service.getAllOffers()
                .then(response => {
                    console.log('pre filtro',response)
                    let filteredOffers = response.data.filter(offer => {
                        let notApplied = this.props.userInSession.offers.includes(offer._id) ? false : true
                        let notSaved = this.props.userInSession.saved.includes(offer._id) ? false : true
                        let notRejected = this.props.userInSession.rejected.includes(offer._id) ? false : true

                        if (notApplied && notSaved && notRejected) {
                            return offer
                        } else {
                            return null
                        }
                    })
                    console.log('post filtro',filteredOffers)
                    this.setState({
                        offersToShow: filteredOffers
                    }, () => {
                        // this.currentOffer = this.state.offersToShow[0];
                        // console.log(this.state)
                        this.forceUpdate()
                    })
                })
                .catch(error => console.log(error))
        }
    }

    removeFromArray = (offerID) => {
        //TODO: Based on the logic of this element removing only the first element would be enough.
        console.log('OFFER TO REMOVE: ', offerID)
        console.log(this.state.offersToShow);
        let offersCopy = [...this.state.offersToShow]
        //offersCopy.splice(offersCopy.indexOf(offerID), 1)
        offersCopy.shift();
        this.setState({
            offersToShow: offersCopy
        }, () => {
            this.currentOffer = this.state.offersToShow[0]
            console.log(this.state)
            this.forceUpdate()
        });
    }

    render() {
        //console.log(this.props)

        if (this.props.userInSession) {

            if (this.props.userInSession.kind === 'Seeker') {

                if (this.state.offersToShow.length > 0) {
                    //console.log(this.state.offersToShow[0])
                    return (
                        <div className="OfferSwiper">
                            <Offer userInSession={this.props.userInSession} currentOffer={this.state.offersToShow[0]} removeFromArray={this.removeFromArray} />
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
}
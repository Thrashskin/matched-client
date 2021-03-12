import React from 'react'
import Offer from './Offer';
import AuthService from './auth/auth-service'
import './OfferSwiper.css'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
//import Logout from './auth/Logout'
import Button from 'react-bootstrap/Button';

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
                    console.log('pre filtro', response)
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
                    console.log('post filtro', filteredOffers)
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
        console.log(this.props)

        if (this.props.userInSession) {

            if (this.props.userInSession.kind === 'Seeker') {

                if (this.state.offersToShow.length > 0) {
                    return (
                        <div className="swiper">
                            <NavigationBar props={this.props} />
                            <div style={{ float: 'left' }}>
                                <Sidebar />
                            </div>
                            <div className='swiper-offer'>
                                <Offer userInSession={this.props.userInSession} currentOffer={this.state.offersToShow[0]} removeFromArray={this.removeFromArray} />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="global-container">
                            <NavigationBar />
                            <div style={{ float: 'left' }}>
                                <Sidebar />
                            </div>
                            <div style={{ float: 'right', margin: '100px 250px 0 0' }}>
                                <p>Sorry, there are no offers matching your current prefferences =(</p>
                            </div>
                        </div>

                    );
                }
            } else {
                return null
            }
        }
    }
}
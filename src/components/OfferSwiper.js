import React from 'react'
import Offer from './Offer';
import BackEndService from './auth/backend-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import './OfferSwiper.css'


export default class OfferSwiper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offersToShow: []
        }
        this.service = new BackEndService();
    }

    componentDidMount() {

        if (this.props.userInSession) {
            this.service.getAllOffers()
                .then(response => {
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
                    this.setState({
                        offersToShow: filteredOffers
                    }, () => {
                        this.forceUpdate()
                    })
                })
                .catch(error => console.log(error))
        }
    }

    removeFromArray = (offerID) => {
        let offersCopy = [...this.state.offersToShow]
        offersCopy.shift();
        this.setState({
            offersToShow: offersCopy
        }, () => {
            this.currentOffer = this.state.offersToShow[0]
            this.forceUpdate()
        });
    }

    render() {
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
                        <div className="swiper">
                            <NavigationBar />
                            <div style={{ float: 'left' }}>
                                <Sidebar />
                            </div>
                            <div className='swiper-offer'>
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
import React from 'react';
import BackEndService from './auth/backend-service'
import Button from 'react-bootstrap/Button';
import './Offer.css'
import save from '../save.png'
import reject from '../reject.png'
import apply from '../apply.png'

export default class Offer extends React.Component {
    constructor(props) {
        super(props);

        this.service = new BackEndService();
        this.handleReject = this.handleReject.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleApply = this.handleApply.bind(this);

        this.state = {
            currentOffer: this.props.currentOffer
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        let { currentOffer } = nextProps
        return {
            currentOffer: currentOffer
        }
    }



    handleReject = () => {
        this.service.rejectOffer(this.state.currentOffer._id)
            .then(response => {
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }

    handleSave = () => {
        this.service.saveOffer(this.state.currentOffer._id)
            .then(response => {
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }

    handleApply = () => {
        this.service.applyToOffer(this.state.currentOffer._id)
            .then(response => {
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }


    render() {
        let { title, description, salary } = this.state.currentOffer
        return (
            <div >
                <div className='offer-container-swiper'>
                <div className='offer-content'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <h3><b>{`${salary.from}€ - ${salary.to}€`}</b></h3>
                </div>
                <div className='options-container'>
                    <Button className='offerSwiperButton' onClick={() => this.handleReject()}>
                        <img src={reject} />
                    </Button>
                    <Button className='offerSwiperButton' onClick={() => this.handleSave()}>
                        <img src={save} />
                    </Button>
                    <Button className='offerSwiperButton' onClick={() => this.handleApply()}>
                        <img src={apply} />
                    </Button>
                </div>
                </div>
                
            </div>
        );
    }
}
import React from 'react';
import AuthService from './auth/auth-service';
import Button from 'react-bootstrap/Button';
import './Offer.css'
import save from '../save.png'
import reject from '../reject.png'
import apply from '../apply.png'

export default class Offer extends React.Component {
    constructor(props) {
        super(props);

        this.service = new AuthService();
        this.handleReject = this.handleReject.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleApply = this.handleApply.bind(this);

        this.state = {
            currentOffer: this.props.currentOffer
        }

        console.log(this.props)
    }

    // componentDidMount() {
    //     //this.setState(this.props.currentOffer, () => this.forceUpdate())
    //     console.log(this.state)
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
        let { currentOffer } = nextProps
        return {
            currentOffer: currentOffer
        }
    }



    handleReject = () => {
        console.log('reject')
        this.service.rejectOffer(this.state.currentOffer._id)
            .then(response => {
                console.log(response)
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }

    handleSave = () => {
        console.log('save')
        this.service.saveOffer(this.state.currentOffer._id)
            .then(response => {
                console.log(response)
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }

    handleApply = () => {
        console.log('apply')
        this.service.applyToOffer(this.state.currentOffer._id)
            .then(response => {
                console.log(response)
                this.props.removeFromArray(this.state.currentOffer._id);
            })
            .catch(error => console.log(error))
    }


    render() {
        // console.log('XXXXXXXX', this.state.currentOffer)
        let { title, description, salary } = this.state.currentOffer
        return (
            <div >
                {/* <div>
                    <h2>HERE GOES THE LOGO</h2><h2>HERE GOES THE NAME</h2>
                </div> */}
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
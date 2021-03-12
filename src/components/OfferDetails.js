import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from './auth/auth-service';
import Button from 'react-bootstrap/Button';
import './OfferDetails.css'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'

export default class OfferDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.service = new AuthService();
        this.offerID = this.props.parentProps.match.params.offerID;


        this.isUserLoggedIn = false;
        this.isUserCompany = false;
        this.isOwner = false;

        this.publisher = '';
        this.publisherID = '';



        console.log(this.props)
    }

    componentDidMount() {
        //let {offerID} = this.props.parentProps.match.params;
        console.log(this.props)
        this.service.getOfferDetails(this.offerID)
            .then(response => {
                let offerDetails = response.data
                this.setState(offerDetails, () => {

                    if (this.props.user) {

                        this.isUserLoggedIn = true;

                        this.isUserCompany = this.props.user.kind === 'Company' ? true : false;

                        this.isOwner = this.props.user._id === this.state.publisher._id ? true : false;
                    }

                    this.publisher = this.state.publisher.name;
                    this.publisherID = this.state.publisher._id;

                    this.forceUpdate();
                })
            })
    }

    applyToOffer = () => {
        this.service.applyToOffer(this.offerID)
            .then(response => {
                this.props.parentProps.history.push('/applications')
            }).catch(error => console.log(error))
    }

    saveOffer = () => {
        this.service.saveOffer(this.offerID)
            .then(response => this.props.parentProps.history.push('/saved'))
            .catch(error => console.log(error))
    }

    SeekerOptions = () => {

        if (this.props.user.kind === 'Seeker') {
            if (this.props.user.offers.includes(this.offerID)) {
                return <div className='operations-container'><p>You already applied to this offer ;)</p></div>
            } else if (this.props.user.saved.includes(this.offerID) && !this.props.user.offers.includes(this.offerID)) {
                return <div className='operations-container'><Button onClick={() => this.applyToOffer()}><Link className='link-custom' to='#'>Apply</Link></Button></div>
            } else {
                return (
                    <div className='operations-container'>
                        <Button className='dark-custom' onClick={() => this.applyToOffer()}><Link className='link-custom' to='#'>Apply</Link></Button>
                        <Button className='dark-custom' onClick={() => this.saveOffer()}><Link className='link-custom' to='#'>Save for later</Link></Button>
                    </div>
                );

            }
        } else {
            return null
        }
    }

    deleteOffer = () => {

        console.log('deleteOffer')

        this.service.deleteOffer(this.offerID)
            .then(response => console.log(response))
            .catch(error => error)

    }



    CompanyOptions = () => {

        if (this.props.user.kind === 'Company') {
            return (
                <div>
                    {this.state.candidates.length > 0 ? <Link to={`/offers/${this.offerID}/candidates`}>See candidates</Link> : <p>There are no candidates yet for this offer.</p>}
                    <br />
                    <div className='operations-container'>
                        <Button className='dark-custom'><Link to={`/offers/${this.offerID}/edit`} className='link-custom'>Edit</Link></Button>
                        <Button className='dark-custom' onClick={() => this.deleteOffer()}>
                            <Link to={`/offers`} className='link-custom'>Delete</Link>
                        </Button>
                    </div>
                </div>
            );
        } else {
            return null
        }


    }

    render() {

        // let isUserLoggedIn = false;
        // let isUserCompany = false;
        // let isOwner = false;

        // if (this.props.user) {

        //     isUserLoggedIn = true;

        //     isUserCompany = this.props.user.kind === 'Company' ? true : false;

        //     isOwner = this.props.user._id === this.state.publisher._id ? true : false;
        // }

        //We need to make sure that each kind of profile only sees the right options
        //i.e., a seeker must not be able to edit an offer or a company must not apply to offers.
        let optionToRender = () => {
            if (this.isUserLoggedIn && this.isUserCompany && this.isOwner) {
                return <this.CompanyOptions />
            } else if (this.isUserLoggedIn && this.isUserCompany && (!this.isOwner)) {
                return null
            } else {
                return <this.SeekerOptions />
            }
        }

        return (
            <div className='offer-details-wraper'>
                <NavigationBar />
                <div style={{ float: 'left' }}>
                    <Sidebar />
                </div>
                <div className='offer-details-content'>
                    <h3>{this.state.title}</h3>
                    {this.isOwner ? null : <div><Link to={`/Company/${this.publisherID}`}><br /><p>{`At: ${this.publisher}`}</p></Link></div>}
                    <br />
                    <p>Description:</p>
                    <p>{this.state.description}</p>
                    <br />
                    <p>Minimum Experience:</p>
                    <p>{this.state.requiredExperience} years</p>
                    <br />
                    <p>Stack: </p>
                    <p>{this.state.stack}</p>
                    {this.state.salary ? <p>{`Salary: ${this.state.salary.from} ${this.state.currency} - ${this.state.salary.to} ${this.state.currency}`}</p>
                        :
                        <p>{`Salary: N/A }`}</p>
                    }
                    {
                        optionToRender()
                    }
                </div>

            </div>
        )
    }
}

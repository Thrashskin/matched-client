import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from './auth/auth-service';
import Button from 'react-bootstrap/Button'

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



        console.log(this.props.user)
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
            .then(response => console.log(response))
            .catch(error => console.log(error.response.data))
    }

    saveOffer = () => {
        this.service.saveOffer(this.offerID)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    SeekerOptions = () => {

        if (this.props.user.offers.includes(this.offerID)) {
            return <p>You already applied to this offer ;)</p>
        } else if (this.props.user.saved.includes(this.offerID) && !this.props.user.offers.includes(this.offerID)) {
            return <Button onClick={() => this.applyToOffer()}><Link to='#'>Apply</Link></Button>
        } else {
            return (
                <div>
                    <Button onClick={() => this.applyToOffer()}><Link to='#'>Apply</Link></Button>
                    <Button onClick={() => this.saveOffer()}><Link to='#'>Save for later</Link></Button>
                </div>
            );

        }
    }

    deleteOffer = () => {

        console.log('deleteOffer')

        this.service.deleteOffer(this.offerID)
            .then(response => console.log(response))
            .catch(error => error)

    }



    CompanyOptions = () => {
        return (
            <div>
                {this.state.candidates.length > 0 ? <Link to={`/offers/${this.offerID}/candidates`}>See candidates</Link> : <p>There are nor candiates yet for this offer.</p>}
                <br/>
                <Button><Link to={`/offers/${this.offerID}/edit`}>Edit</Link></Button>
                <Button onClick={() => this.deleteOffer()}>
                    <Link to={`/offers`}>Delete</Link>
                </Button>
            </div>
        );
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
            <div>
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
        )
    }
}

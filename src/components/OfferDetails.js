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

        console.log(this.offerID)
    }

    componentDidMount() {
        //let {offerID} = this.props.parentProps.match.params;
        console.log(this.offerID)
        this.service.getOfferDetails(this.offerID)
        .then(response => {
            let offerDetails = response.data
            console.log(offerDetails)
            this.setState(offerDetails, () => console.log(offerDetails))
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
        return (
            <div>
                <Button onClick={() => this.applyToOffer()}><Link to='#'>Apply</Link></Button>
                <Button onClick={() => this.saveOffer()}><Link to='#'>Save for later</Link></Button>
            </div>
        );
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
                <Button><Link to={`/offers/${this.offerID}/edit`}>Edit</Link></Button>
                
                <Button onClick = {() => this.deleteOffer()}>
                    <Link to={`/offers`}>Delete</Link>
                </Button>
            </div>
        );
    }

    render() {

        let isUserLoggedIn = false;
        let isUserCompany = false;
        let isOwner = false;

        if (this.props.user) {
            isUserLoggedIn = true;
            isUserCompany = this.props.user.kind === 'Company' ? true : false;
            isOwner = this.props.user._id === this.state.publisher ? true : false;
        }

        //We need to make sure that each kind of profile only sees the right options
        //i.e., a seeker must not be able to edit an offer or a company must not apply to offers.
        let optionToRender =  () => {
            if(isUserLoggedIn && isUserCompany && isOwner) {
                return <this.CompanyOptions />
            } else if (isUserLoggedIn && isUserCompany && (!isOwner)) {
                return null
            } else {
                return <this.SeekerOptions />
            } 
        }

        return (
            <div>
              <h3>{this.state.title}</h3>
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

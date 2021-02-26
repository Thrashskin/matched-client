import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from './auth/auth-service';

export default class OfferDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.service = new AuthService();

    }

    componentDidMount() {
        let {offerID} = this.props.parentProps.match.params;
        this.service.getOfferDetails(offerID)
        .then(response => {
            let offerDetails = response.data
            this.setState(offerDetails)
        })
    }

    SeekerOptions = () => {
        return (
            <div>
                <Link to='/applyTest'>Apply</Link>
                <Link to='/saveTest'>Save for later</Link>
            </div>
        );
    }

    CompanyOptions = () => {
        return (
            <div>
                <Link to='/ediTest'>Edit</Link>
                <Link to='/DeleteTest'>Delete</Link>
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

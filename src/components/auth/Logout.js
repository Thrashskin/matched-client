import React  from 'react'
import {Link} from 'react-router-dom'
import AuthService from './auth-service'

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    logOut = () => {
        this.service.logout()
        .then(() => {
            this.props.logUserOut();
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div>
                <Link to='/' onClick={ () => this.logOut()}>Logout</Link>
            </div>
        )
    }
}

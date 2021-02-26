import React from 'react';
import {Link} from 'react-router-dom';
import UserDetails from './UserDetails'

export default class Profile extends React.Component {

    render() {
        return (
            <div>
                {
                this.props.userInSession ? 
                <div>
                    <UserDetails userInSession={this.props.userInSession}/>
                    <Link to='/profile/edit' >Edit Profile</Link>
                </div> :
                <p>Please, log in =)</p>
                }
            </div>
        )
    }
}

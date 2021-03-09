import React from 'react';
import { Link } from 'react-router-dom';
import UserDetails from './UserDetails'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'

export default class Profile extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.userInSession ?
                        <div>
                            <NavigationBar />
                            <div style={{ float: 'left' }}>
                                <Sidebar />
                            </div>
                            <div style={{ }}>
                            <UserDetails user={this.props.userInSession} />
                                <Link to='/profile/edit' >Edit Profile</Link>
                            </div>

                        </div> :
                        <p>Please, log in =)</p>
                }
            </div>
        )
    }
}

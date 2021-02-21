import React from 'react';
import {Link} from 'react-router-dom';
import UserDetails from './UserDetails'

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {
                this.props.userInSession ? <UserDetails userInSession={this.props.userInSession}/> :
                <p>Please, log in =)</p>
                }
            </div>
        )
    }
}

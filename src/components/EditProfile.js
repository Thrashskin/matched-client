import React from 'react';
import {Link} from 'react-router-dom';

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div>
                {
                this.props.userInSession ? <this.UserDetails userInSession={this.props.userInSession}/> :
                <p>You must be logged in to be able to edit your profile</p>
                }
            </div>
        )
    }
}

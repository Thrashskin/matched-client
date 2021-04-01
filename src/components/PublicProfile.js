import Button from 'react-bootstrap/Button';
import React from 'react';
import BackEndService from './auth/backend-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import './PublicProfile.css'

export default class PublicProfile extends React.Component {

    constructor(props) {

        super(props);
        this.state = {}

        this.service = new BackEndService();
        this.kind = this.props.parentProps.match.params.userType //for the profile NOT for the user in session
        this.userID = this.props.parentProps.match.params.userID //for the profile NOT for the user in session
    }

    async componentDidMount() {
        const response = await this.service.getProfile(this.kind, this.userID);
        await this.setState(response)
    }

    renderChat = () => {
        //since this profile component is valid for both, companies and seekers
        //we need to define who is sending a message to whom.
        let participants = {};

        if (this.props.user.kind === 'Company') {
            participants = {
                company: this.props.user._id,
                seeker: this.userID
            }
        } else {
            participants = {
                company: this.userID,
                seeker: this.props.user._id
            }
        }

        this.service.renderChat(participants)
            .then(response => {
                this.props.parentProps.history.push(`/chats/${response.data._id}`)
            })
            .catch(error => console.log(error))

    }



    render() {
        if (this.state.kind === 'Seeker') {
            let techStack = []
            if (this.state.stack) {
                techStack = [this.state.stack.map((technology, index) => {
                    return <li key={index} className='stack-elem'>{technology}</li>
                })]
            }
            return (
                <div className='public-profile-wraper'>
                    <NavigationBar />
                    <div style={{ float: 'left' }}>
                        <Sidebar />
                    </div>
                    <div className='public-profile-content'>
                        <h1>{`${this.state.name} ${this.state.lastName}`}</h1>
                        <p>Location: {`${this.state.city}, ${this.state.country}`}</p>
                        <p>LinkedIn: {this.state.linkedIn}</p>
                        <p>gitHub: {this.state.gitHub}</p>
                        {
                            (this.state.stack) ?
                                <div>
                                    <p>Technologies:</p>
                                    <br />
                                    <ul className='stack-list'>
                                        {[techStack]}
                                    </ul>
                                </div>
                                :
                                null
                        }
                        <Button className='dark-custom' onClick={() => this.renderChat()}>Send Message</Button>
                    </div>


                </div>
            );
        } else {

            return (
                <div className='public-profile-wraper'>
                    <NavigationBar />
                    <div style={{ float: 'left' }}>
                        <Sidebar />
                    </div>
                    <div className='public-profile-content'>
                        <h1>{this.state.name}</h1>
                        <p>Location: {`${this.state.city}, ${this.state.country}`}</p>
                        <p>{`${this.state.description}`}</p>
                        <Button className='dark-custom' onClick={() => this.renderChat()}>Send Message</Button>
                    </div>

                </div>
            );
        }
    }
}
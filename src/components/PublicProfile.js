import Button from 'react-bootstrap/Button';
import React from 'react';
import AuthService from './auth/auth-service';

export default class PublicProfile extends React.Component {

    constructor(props) {
        
        super(props);
        console.log(props)
        this.state = {}



        this.service = new AuthService();
        this.kind = this.props.parentProps.match.params.userType
        this.userID = this.props.parentProps.match.params.userID
    }

    async componentDidMount() {
        const response = await this.service.getProfile(this.kind, this.userID);
        await this.setState(response)
        await console.log(this.state)
    }
    
     render() {


        if (this.state.kind === 'Seeker') {
        
            let techStack = []
    
            if (this.state.stack) {
                techStack = [this.state.stack.map((technology, index) => {
                    return <li key={index}>{technology}</li>
                })]
            }
    
            return (
                <div>
                    <h1>{`${this.state.name} ${this.state.lastName}`}</h1>
                    <p>Location: {`${this.state.city}, ${this.state.country}`}</p>
                    <p>LinkedIn: {this.state.linkedIn}</p>
                    <p>gitHub: {this.state.gitHub}</p>
                    {
                        (this.state.stack) ? 
                        <div>
                            <p>Technologies:</p>
                            <br />
                            <ul>
                                {[techStack]}
                            </ul>
                        </div>
                        :
                        null
                    }
                    <Button>Send Message</Button>
                    
                </div>
            );
        } else {
    
            return (
                <div>
                    <h1>{this.state.name}</h1>
                    <p>Location: {`${this.state.city}, ${this.state.country}`}</p>
                    <p>{`${this.state.description}`}</p>
                    <Button>Send Message</Button>
                </div>
            );
        }
    }
}
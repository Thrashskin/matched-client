import React from 'react';
import BackEndService from './auth/backend-service'

export default class UserDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }

        this.service = new BackEndService();
        this.kind = this.state.user.kind
        this._id = this.state.user._id
    }

    async componentDidMount() {
        const response = await this.service.getProfile(this.kind, this._id);
        await this.setState({user:response})
        await this.forceUpdate();
    }

    
     render() {

        if (this.state.user.kind === 'Seeker') {
        
            let techStack = []
    
            if (this.state.user.stack) {
                techStack = [this.state.user.stack.map((technology, index) => {
                    return <li key={index}>{technology}</li>
                })]
            }
    
            return (
                <div>
                    <h5>Hi! Welcome to my profile!</h5>
                    <span>My name is</span> <span><b>{`${this.state.user.name} ${this.state.user.lastName}`}</b></span><span>{` and I live in ${this.state.user.city} (This is located in ${this.state.user.country}, by the way).`}</span>
                    <span> You can find me on Linkedin as </span><span><b>{`${this.state.user.linkedIn}`}</b></span> and in GitHub as <span><b>{`${this.state.user.gitHub}.`}</b></span><span></span>
                    <br/>
                    <br/>
                    
                    {
                        (this.state.user.stack) ? 
                        <div>
                            <p>I would be delighted to land a job where I could work with these technologies or languages:</p>
                            <br />
                            <ul className="list-inline">
                                {[techStack]}
                            </ul>
                        </div>
                        :
                        null
                    }
                    
                </div>
            );
        } else {
    
            return (
                <div>
                    <h5>Hi! Welcome to our profile!</h5>
                    <span>We are </span> <span><b>{this.state.user.name}</b></span> <span>{` And we are located in ${this.state.user.city} (This is located in ${this.state.user.country}, by the way).`}</span>
                    <br/>
                    <p>Here you have some information about us:</p>
                    <p>{`${this.state.user.description}`}</p>
                    
                </div>
            );
        }
    }
}
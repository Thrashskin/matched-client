import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'

export default class Conversations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversations: []
        }

        this.service = new AuthService();

        console.log(props);
    }

    componentDidMount() {
        this.service.getMyMessages(this.props.loggedInUser._id)
            .then(response => {
                let conversations = response.data
                console.log(conversations)
                this.setState({
                    conversations: conversations
                }, () => {
                    console.log(this.state)
                    this.forceUpdate()
                })
                //console.log(response.data)
            })
            .catch(error => console.log(error));
    }

    conversationsList = () => {
        let { kind } = this.props.loggedInUser.kind;
        if (this.state.conversations.length > 0) {
            console.log('awesome')
            return this.state.conversations.map((conv, index) => {
                console.log(conv)
                if (kind === 'Company') {
                    return (
                        <li key={index}>
                            <Link><h4>{`Conversation with: ${conv.seeker.name}`}</h4></Link>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <Link to={`/chats/${conv._id}`}><h4>{`Conversation with: ${conv.company.name}`}</h4></Link>
                        </li>
                    )
                }
            });
        } else {
            return <p>There are no conversations to show.</p>
        }

    }

    render() {

        if (this.props.loggedInUser) {
            return (
                <div>
                    <NavigationBar />
                    <div style={{ float: 'left' }}>
                        <Sidebar />
                    </div>
                    <div>
                        <ul>
                            {[this.conversationsList()]}
                        </ul>
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    <NavigationBar />
                    <div style={{ float: 'left' }}>
                        <Sidebar />
                    </div>
                    <div><p>You need to be logged in to see this section. Please <Link to='/login'>login</Link></p></div>

                </div>
            )
        }

    }
}

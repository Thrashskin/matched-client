import React from 'react';
import { Link } from 'react-router-dom';
import BackEndService from './auth/backend-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import './Conversations.css'

export default class Conversations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversations: []
        }

        this.service = new BackEndService();
    }

    componentDidMount() {
        this.service.getMyMessages(this.props.loggedInUser._id)
            .then(response => {
                let conversations = response.data
                this.setState({
                    conversations: conversations
                }, () => {
                    this.forceUpdate()
                })
            })
            .catch(error => console.log(error));
    }

    conversationsList = () => {
        let { kind } = this.props.loggedInUser.kind;
        if (this.state.conversations.length > 0) {
            return this.state.conversations.map((conv, index) => {
                if (kind === 'Company') {
                    return (
                        <li key={index} className='individual-chat'>
                            <Link><h4>{`Conversation with: ${conv.seeker.name}`}</h4></Link>
                        </li>
                    )
                } else {
                    return (
                        <li key={index} className='individual-chat'>
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
                <div className='chats-wraper'>
                    <NavigationBar />
                    <div style={{ float: 'left' }}>
                        <Sidebar />
                    </div>
                    <div className='list-wraper'>
                        <h1>Chats</h1>
                        <br/>
                        <br/>
                        <ul className='list-wraper'>
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
                    <div>
                        <p>You need to be logged in to see this section. Please <Link to='/login'>login</Link></p>
                        </div>

                </div>
            )
        }

    }
}

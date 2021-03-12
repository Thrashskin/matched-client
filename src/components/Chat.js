import React from 'react';
import Message from './Message';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
//import config from '../config';


// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

import BottomBar from './BottomBar';
import './Chat.css';
import AuthService from './auth/auth-service';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props)

    this.state = {
      senderID: '',
      senderName: '',
      content: ''
    };

    this.service = new AuthService();
    this.allowed = false;
    this.chatID = this.props.parentProps.match.params.chatID
    this.messages = [];
  }

  componentDidMount() {

    if (this.props.userInSession) {
      this.allowed = true;

      this.service.getChatByID(this.chatID)
        .then(response => {
          console.log(response)
          this.messages = response.data.messages
          this.setState({
            senderID: this.props.userInSession._id,
            senderName: this.props.userInSession.name
          }, () => this.forceUpdate())
        })
        .catch(error => console.log(error))
    } else {
      this.forceUpdate();
    }

  }

  updateChat = () => {
    this.service.getChatByID(this.chatID)
      .then(response => {
        console.log(response)
        this.messages = response.data.messages
        this.forceUpdate();
      })
      .catch(error => console.log(error))
  }

  handleChange(e) {

    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => console.log(this.state));
  }

  handleSubmit(e) {
    // Prevent the form to reload the current page.
    e.preventDefault();
    console.log(this.state)
    this.service.submitMessage(this.chatID, this.state)
      .then(response => {
        console.log(response);
        this.setState({
          content: ''
        }, () => this.updateChat())
      })
      .catch(error => console.log(error))
    //this.scrollToBottom
  }

  messagesList = () => {
    return this.messages.map((msg, index) => {
      console.log(msg)
      return (
        <li key={index}>
          <p>{`${msg.senderName}: ${msg.content}`}</p>
        </li>
      );
    })
  }

  // Always make sure the window is scrolled down to the last message.
  // scrollToBottom() {
  //   const chat = document.getElementById('chat');
  //   chat.scrollTop = chat.scrollHeight;
  // }

  render() {

    if (this.allowed) {
      return (
        <div className='global-chat-wraper'>
          <NavigationBar />
          <div style={{ float: 'left' }}>
            <Sidebar />
          </div>
          <div className='individual-chat-wraper'>
            <ul className='messages-list'>
              {this.messages.length > 0 ? this.messagesList() : null}
            </ul>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridContent">
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Control type="text" placeholder='Type your message here...' value={this.state.content} onChange={e => this.handleChange(e)} name="content" />
                </Form.Group>
              </Form.Row>
              <Button className='dark-custom' variant="primary" type="submit">Submit</Button>
              {/* <Button variant="primary" onClick={() => this.updateChat()}>Update</Button> */}
            </Form>
          </div>

        </div>
      );
    } else {
      return (
        <p>You are not allowed to access this section. Sorry for the inconveniences.</p>
      );
    }

  }
};

export default Chat;
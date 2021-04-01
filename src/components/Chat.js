import React from 'react';
import Message from './Message';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import BottomBar from './BottomBar';
import BackEndService from './auth/backend-service'
import './Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senderID: '',
      senderName: '',
      content: ''
    };

    this.service = new BackEndService();
    this.allowed = false;
    this.chatID = this.props.parentProps.match.params.chatID
    this.messages = [];
  }

  componentDidMount() {

    if (this.props.userInSession) {
      this.allowed = true;

      this.service.getChatByID(this.chatID)
        .then(response => {
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
        this.messages = response.data.messages
        this.forceUpdate();
      })
      .catch(error => console.log(error))
  }

  handleChange(e) {

    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    // Prevent the form to reload the current page.
    e.preventDefault();
    this.service.submitMessage(this.chatID, this.state)
      .then(response => {
        this.setState({
          content: ''
        }, () => this.updateChat())
      })
      .catch(error => console.log(error))
  }

  messagesList = () => {
    return this.messages.map((msg, index) => {
      return (
        <li key={index}>
          <p>{`${msg.senderName}: ${msg.content}`}</p>
        </li>
      );
    })
  }


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
                  <Form.Control type="text" placeholder='Type your message here...' value={this.state.content} onChange={e => this.handleChange(e)} name="content" />
                </Form.Group>
              </Form.Row>
              <Button className='dark-custom' variant="primary" type="submit">Submit</Button>
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
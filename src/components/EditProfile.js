import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BackEndService from './auth/backend-service'
import NavigationBar from './NavigationBar'
import Sidebar from './Sidebar'
import './EditProfile.css'

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.userInSession) {
            if (this.props.userInSession.kind === 'Seeker') {
                const { name, lastName, city, country, email, stack, gitHub, linkedIn } = this.props.userInSession;
                this.state = {
                    name: name,
                    lastName: lastName,
                    city: city,
                    country: country,
                    email: email,
                    stack: stack,
                    gitHub: gitHub,
                    linkedIn: linkedIn,
                }
            } else {
                const { name, city, country, email, description } = this.props.userInSession;
                this.state = {
                    name: name,
                    city: city,
                    country: country,
                    email: email,
                    description: description
                }
            }
        }

        this.service = new BackEndService();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let userKind = this.props.userInSession.kind === 'Seeker' ? 'seeker' : 'company'
        let { _id } = this.props.userInSession
        let { name, lastName, city, country, email, gitHub, linkedIn, description } = this.state;
        let updatedProfile = {}
        let stack = []

        if (userKind === 'seeker') {
            stack = String(this.state.stack)
            stack = stack.replace(" ", "");
            stack = stack.split(",")
            updatedProfile = { name, lastName, city, country, email, gitHub, linkedIn, stack }
        } else {
            updatedProfile = { name, city, country, email, description }
        }

        this.service.editProfile(userKind, _id, updatedProfile)
            .then(response => {
                this.props.parentProps.history.push('/profile')
            })
            .catch(error => error)
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    EditForm = (props) => {
        if (props.userInSession.kind === 'Seeker') {
            return (
                <Form onSubmit={event => this.handleFormSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={e => this.handleChange(e)} name="name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" value={this.state.lastName} onChange={e => this.handleChange(e)} name="lastName" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.email} onChange={e => this.handleChange(e)} name="email" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={this.state.city} onChange={e => this.handleChange(e)} name="city" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={this.state.country} onChange={e => this.handleChange(e)} name="country" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridStack">
                            <Form.Label>My Tech-Stack</Form.Label>
                            <Form.Control type="text" value={this.state.stack} placeholder="e.g., JavaScript, Python, Java, NodeJS..." onChange={e => this.handleChange(e)} name="stack" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLinkedIn">
                            <Form.Label>LinkedIn Profile</Form.Label>
                            <Form.Control value={this.state.linkedIn} onChange={e => this.handleChange(e)} name="linkedIn" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGitHub">
                            <Form.Label>GitHub Profile</Form.Label>
                            <Form.Control value={this.state.gitHub} onChange={e => this.handleChange(e)} name="gitHub" />
                        </Form.Group>
                    </Form.Row>

                    <Button className='dark-custom' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            );
        } else {
            return (
                <Form onSubmit={event => this.handleFormSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={e => this.handleChange(e)} name="name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.email} onChange={e => this.handleChange(e)} name="email" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={this.state.city} onChange={e => this.handleChange(e)} name="city" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={this.state.country} onChange={e => this.handleChange(e)} name="country" />
                        </Form.Group>
                    </Form.Row>



                    <Form.Group controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={this.state.description} onChange={e => this.handleChange(e)} name="description" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            );
        }

    }

    render() {
        return (
            <div className='edit-profile-wraper'>
                <NavigationBar />
                <div style={{ float: 'left' }}>
                    <Sidebar />
                </div>
                <div className='edit-profile-content'>
                    {
                        this.props.userInSession ? <this.EditForm userInSession={this.props.userInSession} /> :
                            <p>You must be logged in to be able to edit your profile</p>
                    }
                </div>
            </div>
        )
    }
}

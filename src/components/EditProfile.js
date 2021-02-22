import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.userInSession) {
            if (this.props.userInSession.kind === 'Seeker') {
                const {name, lastName, city, country, email, gitHub, linkedIn} = this.props.userInSession;
                this.state = {
                    name: name,
                    lastName: lastName,
                    city: city,
                    country: country,
                    email: email,
                    gitHub: gitHub,
                    linkedIn: linkedIn,
                }
            } else {
                const {name, city, country, email} = this.props.userInSession;
                this.state = {
                    name: name,
                    city: city,
                    country: country,
                    email: email,
                }
            }
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let user = this.props.userInSession.kind === 'Seeker' ? 'seeker' : 'company'
        let {_id } = this.props.userInSession
        axios.put(`http://localhost:5000/api/${user}/${_id}`, this.state)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
          [name]:value
        })
    }

    EditForm = (props) => {
        if (props.userInSession.kind === 'Seeker') {
            return (
                <Form onSubmit = {event => this.handleFormSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={ e => this.handleChange(e)} name="name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" value={this.state.lastName} onChange={ e => this.handleChange(e)} name="lastName"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.email} onChange={ e => this.handleChange(e)} name="email"/>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={this.state.city} onChange={ e => this.handleChange(e)} name="city"/>
                    </Form.Group>

                    <Form.Group controlId="formGridCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={this.state.country} onChange={ e => this.handleChange(e)} name="country"/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLinkedIn">
                            <Form.Label>LinkedIn Profile</Form.Label>
                            <Form.Control value={this.state.linkedIn} onChange={ e => this.handleChange(e)} name="linkedIn"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridGitHub">
                            <Form.Label>GitHub Profile</Form.Label>
                            <Form.Control  value={this.state.gitHub} onChange={ e => this.handleChange(e)} name="gitHub"/>
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group> */}
                    </Form.Row>

                    {/* <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            );
        } else {
            return (
                <Form onSubmit = {event => this.handleFormSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name} onChange={ e => this.handleChange(e)} name="name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.email} onChange={ e => this.handleChange(e)} name="email"/>
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={this.state.city} onChange={ e => this.handleChange(e)} name="city"/>
                    </Form.Group>

                    <Form.Group controlId="formGridCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={this.state.country} onChange={ e => this.handleChange(e)} name="country"/>
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
            <div>
                {
                    this.props.userInSession ? <this.EditForm userInSession={this.props.userInSession} /> :
                        <p>You must be logged in to be able to edit your profile</p>
                }
                {/* <this.EditForm /> */}
            </div>
        )
    }
}

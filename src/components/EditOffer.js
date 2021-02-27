import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link, Redirect, Route } from 'react-router-dom'
import AuthService from './auth/auth-service'


export default class EditOffer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.service = new AuthService();
    }

    componentDidMount() {
        console.log(this.props)
        this.service.getOfferDetails(this.props.parentProps.match.params.offerID)
            .then(response => {
                const offerFromDB = response.data
                this.setState({ ...offerFromDB, salaryFrom: offerFromDB.salary.from, salaryTo: offerFromDB.salary.to }, () => console.log(this.state))
            })
            .catch(error => console.log(error))
    }


    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        let { title, description, stack, currency, requiredExperience } = this.state;
        let salary = {
            from: this.state.salaryFrom,
            to: this.state.salaryTo
        }
        let updateBody = { title, description, stack, currency, requiredExperience, salary }
        console.log(updateBody)
        this.service.editOffer(this.props.parentProps.match.params.offerID, updateBody)
            .then(response => {
                console.log(response)
                return (
                    <Route render={
                        props => {
                            return <Redirect to={{ pathname: '/offers', state: { from: this.props.location } }} />
                        }
                    } />
                )
            })
            .catch(error => error)
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => console.log(this.state))
    }

    EditForm = (props) => {

        if (props.userInSession) {
            if (props.userInSession.kind === 'Seeker' || (props.userInSession._id !== this.state.publisher)) {
                return (
                    <div>
                        <p>Only the publisher of this offer can access to this section.</p>
                        <p>If you are the owner of the offer, please <Link to='/login'>Login</Link></p>
                    </div>
                );
            } else {
                return (
                    <Form onSubmit={event => this.handleFormSubmit(event)}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={e => this.handleChange(e)} name="title" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" value={this.state.description} onChange={e => this.handleChange(e)} name="description" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridStack">
                                <Form.Label>Stack</Form.Label>
                                <br />
                                <Form.Label>Required Technologies</Form.Label>
                                <Form.Control type="text" value={this.state.stack} onChange={e => this.handleChange(e)} name="stack" />
                                <p>Note: Please, keep it short. Add only the top ones. Let's face it, if you really need a HUGE stack, you might not be looking for a developer but for a whole team.</p>
                                <Form.Label>Minimum Experience (years): </Form.Label>
                                <Form.Control type="number" value={this.state.requiredExperience} onChange={e => this.handleChange(e)} name="requiredExperience" />
                                <p>Note: Please, be realistic. Do you really need someone with that much of experience?</p>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridSalary">
                            <Form.Label>Salary</Form.Label>
                            <br />
                            <Form.Label>From</Form.Label>
                            <Form.Control type='number' value={this.state.salaryFrom} onChange={e => this.handleChange(e)} name="salaryFrom" />
                            <Form.Label>To</Form.Label>
                            <Form.Control type='number' value={this.state.salaryTo} onChange={e => this.handleChange(e)} name="salaryTo" />
                            <Form.Label>Currency</Form.Label>
                            <Form.Control as="select" value={this.state.currency} name='currency' onChange={e => this.handleChange(e)} custom>
                                <option>EUR</option>
                                <option>USD</option>
                                <option>GBP</option>
                                <option>BTC</option>
                                <option>ETH</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                );
            }
        } else {
            return <p>You need to be Logged In to access this section. Please, <Link to='/login'>Login</Link></p>
        }

    }


    render() {
        return (
            <div>
                jelou
                <this.EditForm userInSession={this.props.userInSession} />
            </div>
        )
    }
}

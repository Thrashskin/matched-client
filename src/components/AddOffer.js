import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default class AddOffer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            stack: '',
            currency: '',
            requiredExperience: '',
            salaryFrom: 0,
            salaryTo: 0
        }
    }

    handleFormSubmit(event) {

        event.preventDefault();
        let stackNew = this.state.stack.split(',')
        let reqBody = {
            title: this.state.title,
            description: this.state.description,
            stack: stackNew,
            currency: this.state.currency,
            requiredExperience: this.state.requiredExperience,
            salary:{
                from:this.state.salaryFrom,
                to: this.state.salaryTo
            }
        }

        console.log(reqBody)
        
        
        
    }

    handleChange(event) {
        console.log(this.state)
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Form onSubmit={event => this.handleFormSubmit(event)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder='A catchy title' onChange={e => this.handleChange(e)} name="title" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder='Keep it short ;)' onChange={e => this.handleChange(e)} name="description" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridStack">
                        <Form.Label>Stack</Form.Label>
                        <br />
                        <Form.Label>Required Technologies</Form.Label>
                        <Form.Control type="text" placeholder='e.g., JavaScript, NodeJS, Python, Django' onChange={e => this.handleChange(e)} name="stack" />
                        <p>Note: Please, keep it short. Add only the top ones. Let's face it, if you really need a HUGE stack, you might not be looking for a developer but for a whole team.</p>
                        <Form.Label>Minimum Experience (years): </Form.Label>
                        <Form.Control type="number" placeholder='0' onChange={e => this.handleChange(e)} name="stack" />
                        <p>Note: Please, be realistic. Do you really need someone with that much of experience?</p>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridSalary">
                    <Form.Label>Salary</Form.Label>
                    <br />
                    <Form.Label>From</Form.Label>
                    <Form.Control type='number' placeholder='e.g., 35000' onChange={e => this.handleChange(e)} name="salary.from" />
                    <Form.Label>To</Form.Label>
                    <Form.Control type='number' placeholder='e.g., 45000' onChange={e => this.handleChange(e)} name="salary.to" />
                    <Form.Label>Currency</Form.Label>
                    <Form.Control as="select" name='currency' onChange={e => this.handleChange(e)} custom>
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
}

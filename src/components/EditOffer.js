import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import AuthService from './auth/auth-service'


export default class EditOffer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.service = new AuthService();
    }

    componentDidMount() {

        console.log(this.props)
    //     this.service.getOfferDetails(this.props.match.params)
    //     .then(response => {
    //         const offerFromDB = response.data
    //         this.setState(offerFromDB)
    //     })
    //     .catch(error => console.log(error))
    // }

    }


    handleFormSubmit(event){
        event.preventDefault();
        let {offerID } = this.props.match.params

        this.service.editOffer(offerID, this.state)
        .then(response => response)
        .catch(error => error)
    }

    handleChange(event){
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    EditForm = (props) => {
        
        if (props.userInSession) {
            if (props.userInSession.kind === 'Seeker' || (props.userInSession !== this.state.publisher ) ) {
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
        } else {
            return <p>You need to be Logged In to access this section. Please, <Link to='/login'>Login</Link></p>
        }

    }


    render() {
        return (
            <div>
                <this.EditForm userInSession = {this.props.userInSession}/>
            </div>
        )
    }
}

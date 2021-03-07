import React from 'react'
import { Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from './auth-service'
import './Signup.css'

export default class Signup extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      goal: '',
      errorMessage: ''
    }

    this.service = new AuthService();
  }



  handleFormSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const kind = this.state.goal.includes('talent') ? 'Company' : 'Seeker';

    this.service.signup(email, password, kind)
      .then(response => {

        if (response.errorMessage) {
          this.setState({
            errorMessage: response.errorMessage
          })
        } else {
          console.log(response)
          localStorage.setItem('user', JSON.stringify(response.newUser))
          this.props.setUser(response.newUser);
          this.setState({
            email: '',
            password: '',
            goal: '',
            errorMessage: ''
          });
        }
        //console.log(response.errorMessage)
      })
      .catch(error => error);

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Container>
        <h3 className='text-center'>Sign Up</h3>
        <Form onSubmit={this.handleFormSubmit}>

          <div className="form-group"><Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} /></div>
          <div className="form-group">
            <Form.Label>Password:</Form.Label>
            <Form.Control name="password" type="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <Form.Label>I want to:</Form.Label>
            <br />
            <select className="browser-default custom-select " name='goal' onChange={e => this.handleChange(e)}>
              <option>Land my dream job</option>
              <option>Hire the best talent in the world</option>
            </select>
          </div>






          <br />
          <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>

          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
        </Form>

        <br />
        <p className="text-center">Already have account?
                <Link to={"/login"}> Login</Link>
        </p>

      </Container>
    )
  }
}
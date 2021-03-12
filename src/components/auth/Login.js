import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from './auth-service'
import { Form, Container } from 'react-bootstrap'
import './Login.css'
import logo from '../../logo_black.png'

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }

    this.service = new AuthService();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(event) {

    const { email, password } = this.state;
    event.preventDefault();

    const liftUser = (response) => this.props.setUser(response);

    this.service.login(email, password)
      .then(response => {
        //      console.log(response)

        if (response.errorMessage) {

          this.setState({
            email: '',
            password: '',
            errorMessage: response.errorMessage
          })

        } else {
          console.log(response)
          localStorage.setItem('user', JSON.stringify(response))

          //Cookies.set('user', JSON.stringify(response))
          this.setState({
            email: '',
            password: ''
          }, () => {
            console.log('lifting user')
            liftUser(response)
          })

        }
      })
      .catch(error => error)


  }

  render() {
    return (
      <Container>

        <img className='logo-login' src={logo} />
        <h3 className='text-center'>Log in</h3>
        

        <Form onSubmit={e => this.handleFormSubmit(e)}>
          <div className="form-group">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
            <Form.Label>Password:</Form.Label>
            <Form.Control name="password" type="password" value={this.state.password} onChange={e => this.handleChange(e)} />
            {/* <input name="password" type="password" className="form-control" value={this.state.password} onChange={ e => this.handleChange(e)} /> */}
          </div>

          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}

          <button type="submit" className="btn btn-dark btn-lg btn-block">Log In</button>
          {/* <input type="submit" value="Login" /> */}
        </Form>


        <br />
        <p className="text-center">Don't have an account?
                <Link to={"/signup"}> Sign Up</Link>
        </p>
      </Container>
    )
  }
}
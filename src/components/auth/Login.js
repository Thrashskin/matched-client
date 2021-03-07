import React from 'react'
import {Link} from 'react-router-dom'
import AuthService from './auth-service'

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      errorMessage:''
    }

    this.service = new AuthService();
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]:value
    })
  }

  handleFormSubmit(event) {

    const { email, password } = this.state;
    event.preventDefault();

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
        this.setState({
          email: '',
          password: ''
        })
        this.props.setUser(response)
      }
    })
    .catch(error => error)


  }

    render(){
        return(
          <div>   
            <form onSubmit={ e => this.handleFormSubmit(e)}>
              <label>Email:</label>
              <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
              
              <label>Password:</label>
              <input name="password" type="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
              
              <input type="submit" value="Login" />
            </form>

            {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}

            <p>Don't have an account? 
                <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        )
      }
}
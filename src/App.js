import './App.css';
import React from 'react';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import {Link, Switch, Route} from 'react-router-dom'

class App extends React.Component {

  constructor() {
   super()
    this.state = {
      userInSession: null
   }
}

setUserInSession = userObject => {
  this.setState({
    userInSession: userObject
  });
}

logOutUser = () => {
  this.setState({
    userInSession: null
  })
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Matched - The first step to find the special one ;) (We are talking about a job!)
        </p>
        <div>
          { this.state.userInSession ? <p>{`Hola ${this.state.userInSession.email}`}</p> : <p>Fuck off</p> }
        </div>
        <Link to='/signup'>Signup</Link>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
        <Logout logUserOut = { () => this.logOutUser() }/>
        
      </header>
      <Switch>
        <Route exact path="/signup" render={ () =>  <Signup setUser={this.setUserInSession} /> }/>
        <Route exact path="/login" render={ () =>  <Login setUser={this.setUserInSession} /> }/>
      </Switch>
    </div>
  );
}


}

export default App;
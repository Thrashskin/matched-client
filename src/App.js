//import './App.css';
import React from 'react';

//THIRD PARTY COMPONENTS
import {Link, Switch, Route} from 'react-router-dom'

//LOCAL COMPONENTS
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import HorizontalNavbar from './components/HorizontalNavbar'
import Profile from './components/Profile'



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
        <HorizontalNavbar/>
        <p>
          Welcome to Matched - The first step to find the special one ;) (We are talking about a job!)
        </p>
        <div>
          { this.state.userInSession ? <p>{`Hola ${this.state.userInSession.email}`}</p> : <p>Pls, log in mate</p> }
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
        <Route exact path="/profile" render={ () =>  <Profile userInSession={this.state.userInSession} /> }/>
      </Switch>
    </div>
  );
}


}

export default App;
//import './App.css';
import React from 'react';

//THIRD PARTY COMPONENTS
import {Link, Switch, Route} from 'react-router-dom'

//LOCAL COMPONENTS
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AddOffer from './components/AddOffer';
import ProtectedRoute from './components/auth/protected-route'
import OfferList from './components/OfferList';
import OfferDetails from './components/OfferDetails';
import EditOffer from './components/EditOffer';
import OfferSwiper from './components/OfferSwiper';
import Chat from './components/Chat';
import CandidatesList from './components/CandidatesList';
import PublicProfile from './components/PublicProfile';

//Styles


class App extends React.Component {

  constructor() {
   super()
    this.state = {
      userInSession: null //JSON.parse(localStorage.getItem('user'))
   }
}

componentDidMount() {
  const userInSession = localStorage.getItem('user')
  this.setState({
    userInSession: JSON.parse(userInSession)
  })
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
        <NavigationBar />
        <Sidebar userInSession={this.state.userInSession}/>
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
        <br/>
        {this.state.userInSession ? <OfferSwiper userInSession={this.state.userInSession}/> : null}
        
        
      </header>
      <Switch>
        <Route exact path="/signup" render={ () =>  <Signup setUser={this.setUserInSession} /> }/>
        <Route exact path="/login" render={ () =>  <Login setUser={this.setUserInSession} /> }/>
        <Route exact path="/profile" render={ () =>  <Profile userInSession={this.state.userInSession} /> }/>
        <Route exact path="/profile/edit" render={ props =>  <EditProfile parentProps = {props} userInSession={this.state.userInSession} /> }/> {/*NEEDS PROTECTION*/}
        {/* <Route exact path="/offers/add-offer" render={ () =>  <AddOffer userInSession={this.state.userInSession} /> }/> */}
        <ProtectedRoute exact path="/offers" user={this.state.userInSession} component={OfferList}/>
        <ProtectedRoute exact path="/applications" user={this.state.userInSession} component={OfferList}/>
        <ProtectedRoute exact path="/saved" user={this.state.userInSession} component={OfferList}/>
        <ProtectedRoute exact path="/offers/add-offer" user={this.state.userInSession} component={AddOffer}/>
        {/* <ProtectedRoute exact path="/offers/add-offer" render = { props => <AddOffer parentProps = {props} userInSession = {this.state.userInSession}/>} /> */}
        <Route exact path="/offers/:offerID" render = { props => <OfferDetails parentProps = {props} user = {this.state.userInSession}/>} />
        <Route exact path="/offers/:offerID/edit" render = { props => <EditOffer parentProps = {props} userInSession = {this.state.userInSession}/>} />
        <Route exact path="/offers/:offerID/candidates" render = { props => <CandidatesList parentProps = {props} userInSession = {this.state.userInSession}/>} />
        <Route exact path="/chats/:chatID" render = { props => <Chat parentProps = {props} userInSession = {this.state.userInSession}/>} />
        <Route exact path="/:userType/:userID" render={ props =>  <PublicProfile parentProps = {props} user={this.state.userInSession} /> }/>
        
      </Switch>
    </div>
  );
}
}

export default App;
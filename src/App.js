import './App.css';
import React from 'react';

//THIRD PARTY COMPONENTS
import { Link, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Cookies from 'js-cookie'

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
import Conversations from './components/Conversations';

//Styles


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      userInSession: JSON.parse(localStorage.getItem('user'))
    }
  }

  componentDidMount() {
    const userInSession = localStorage.getItem('user')
    this.setState({
      userInSession: JSON.parse(userInSession)
      //userInSession: JSON.parse(Cookies.get('user'))
    }, () => this.forceUpdate())
  }

  setUserInSession = userObject => {
    console.log(userObject)
    this.setState({
      userInSession: userObject
    }, () => this.forceUpdate());
  }

  logOutUser = () => {
    this.setState({
      userInSession: null
    })
  }


  render() {

    if (!this.state.userInSession) {
      return (





        <Switch>
          <Route exact path="/" render={() => {
            return (
              <div>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/signup">Signup</Link>
              </div>
              
             );
            }
          } />
          <Route exact path="/login" render={() => <Login setUser={this.setUserInSession} />} />
          <Route exact path="/signup" render={() => <Signup setUser={this.setUserInSession} />} />
        </Switch>
      );
    } else {



      return (

        <div className="App">
          <header className="wrapper">

            <NavigationBar userInSession={this.state.userInSession} className='navbar' />



            <section className='content-container'>

              <Sidebar userInSession={this.state.userInSession} className='sidebar' />

              <div className='content'>

                <div >
                  {this.state.userInSession ? <h1>{`Hola ${this.state.userInSession.email} - THIS NEEDS TO BE REMOVED`}</h1> : <p>Pls, log in mate</p>}
                </div>


                <Logout logUserOut={() => this.logOutUser()} />
                <br />
                {this.state.userInSession ? <OfferSwiper userInSession={this.state.userInSession} /> : null}

              </div>


            </section>




          </header>
          <Switch>
            {/* <Route exact path="/signup" render={() => <Signup setUser={this.setUserInSession} />} />
            <Route exact path="/login" render={() => <Login setUser={this.setUserInSession} />} /> */}
            <Route exact path="/profile" render={() => <Profile userInSession={this.state.userInSession} />} />
            <Route exact path="/profile/edit" render={props => <EditProfile parentProps={props} userInSession={this.state.userInSession} />} /> {/*NEEDS PROTECTION*/}
            {/* <Route exact path="/offers/add-offer" render={ () =>  <AddOffer userInSession={this.state.userInSession} /> }/> */}
            <ProtectedRoute exact path="/offers" user={this.state.userInSession} component={OfferList} />
            <ProtectedRoute exact path="/applications" user={this.state.userInSession} component={OfferList} />
            <ProtectedRoute exact path="/saved" user={this.state.userInSession} component={OfferList} />
            <ProtectedRoute exact path="/messages" user={this.state.userInSession} component={Conversations} />
            <ProtectedRoute exact path="/offers/add-offer" user={this.state.userInSession} component={AddOffer} />
            {/* <ProtectedRoute exact path="/offers/add-offer" render = { props => <AddOffer parentProps = {props} userInSession = {this.state.userInSession}/>} /> */}
            <Route exact path="/offers/:offerID" render={props => <OfferDetails parentProps={props} user={this.state.userInSession} />} />
            <Route exact path="/offers/:offerID/edit" render={props => <EditOffer parentProps={props} userInSession={this.state.userInSession} />} />
            <Route exact path="/offers/:offerID/candidates" render={props => <CandidatesList parentProps={props} userInSession={this.state.userInSession} />} />
            <Route exact path="/chats/:chatID" render={props => <Chat parentProps={props} userInSession={this.state.userInSession} />} />
            <Route exact path="/:userType/:userID" render={props => <PublicProfile parentProps={props} user={this.state.userInSession} />} />
          </Switch>
        </div>


      );
    }

    // if (this.state.userInSession) {

    //   return (
    //     <Container>
    //       <div className="App">
    //         <header className="App-header">
    //           <NavigationBar />
    //           <Sidebar userInSession={this.state.userInSession} />

    //           <div>
    //             {this.state.userInSession ? <h1>{`Hola ${this.state.userInSession.email} - THIS NEEDS TO BE REMOVED`}</h1> : <p>Pls, log in mate</p>}
    //           </div>


    //           <Logout logUserOut={() => this.logOutUser()} />
    //           <br />
    //           {this.state.userInSession ? <OfferSwiper userInSession={this.state.userInSession} /> : null}


    //         </header>
    //         <Switch>
    //           <Route exact path="/signup" render={() => <Signup setUser={this.setUserInSession} />} />
    //           <Route exact path="/login" render={() => <Login setUser={this.setUserInSession} />} />
    //           <Route exact path="/profile" render={() => <Profile userInSession={this.state.userInSession} />} />
    //           <Route exact path="/profile/edit" render={props => <EditProfile parentProps={props} userInSession={this.state.userInSession} />} /> {/*NEEDS PROTECTION*/}
    //           {/* <Route exact path="/offers/add-offer" render={ () =>  <AddOffer userInSession={this.state.userInSession} /> }/> */}
    //           <ProtectedRoute exact path="/offers" user={this.state.userInSession} component={OfferList} />
    //           <ProtectedRoute exact path="/applications" user={this.state.userInSession} component={OfferList} />
    //           <ProtectedRoute exact path="/saved" user={this.state.userInSession} component={OfferList} />
    //           <ProtectedRoute exact path="/messages" user={this.state.userInSession} component={Conversations} />
    //           <ProtectedRoute exact path="/offers/add-offer" user={this.state.userInSession} component={AddOffer} />
    //           {/* <ProtectedRoute exact path="/offers/add-offer" render = { props => <AddOffer parentProps = {props} userInSession = {this.state.userInSession}/>} /> */}
    //           <Route exact path="/offers/:offerID" render={props => <OfferDetails parentProps={props} user={this.state.userInSession} />} />
    //           <Route exact path="/offers/:offerID/edit" render={props => <EditOffer parentProps={props} userInSession={this.state.userInSession} />} />
    //           <Route exact path="/offers/:offerID/candidates" render={props => <CandidatesList parentProps={props} userInSession={this.state.userInSession} />} />
    //           <Route exact path="/chats/:chatID" render={props => <Chat parentProps={props} userInSession={this.state.userInSession} />} />
    //           <Route exact path="/:userType/:userID" render={props => <PublicProfile parentProps={props} user={this.state.userInSession} />} />

    //         </Switch>
    //       </div>
    //     </Container>

    //   );
    // } else {
    //   return (
    //     <div>
    //       <Login/>
    //       <Switch>
    //       <Route exact path="/login" render={() => <Login setUser={this.setUserInSession} />} />
    //         <Route exact path="/signup" render={() => <Signup setUser={this.setUserInSession} />} />
    //       </Switch>
    //     </div>

    //   );
    // }
  }
}

export default App;
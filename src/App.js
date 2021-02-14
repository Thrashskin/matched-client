import logo from './logo.svg';
import './App.css';
import Signup from './components/auth/Signup'
import {Link, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Matched - The first step to find the special one ;) (We are talking about a job!)
        </p>
        <Link to='/signup'>Signup</Link>
      </header>
      <Switch>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;

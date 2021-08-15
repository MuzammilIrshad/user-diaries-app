import './App.css';
import Login from './Components/Login/Login';
import CreateAccount from './Components/Acc_SignUp/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from './Components/NavBar/Navbar';
import DiariesPage from './Components/DiariesLandingPage/Diaries';
import Edit from './Components/DiariesLandingPage/Edit';
import EntriesList from './Components/Entries/EntriesList';



function App() {
  return (

    <Router>
      <NavBar/>
      <div>
    <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="/signup"component={CreateAccount}/>
    <Route exact path="/diaries"component={DiariesPage}/>
    <Route exact path="/diaries/diary/:id">
      <Edit/>
    </Route>
    <Route path="/diary/:id/entries"component={EntriesList}/>
  </Switch>
  </div>
</Router>

  );
}

export default App;


import Register from "./components/Register";
import Logout from "./components/Logout";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./components/NavBar";
import NewPaste from "./components/NewPaste";
import LatestPastes from "./components/LatestPastes";
import ShowPaste from "./components/ShowPaste";


function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <div className="App light-green lighten-5">
        <Header></Header>
        <main className="container">
          <Switch>
            <Route path="/" exact component={NewPaste}></Route>
            <Route path="/latest" component={LatestPastes}></Route>
            <Route path="/paste/:idx" component={ShowPaste}></Route>
            <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/logout"> {user ? <Logout /> : <Redirect to="/" />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
          </Switch>
        </main>
        
      </div>
    </Router>
  );
}

export default App;

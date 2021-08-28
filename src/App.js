import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Reset from "./components/Reset";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/signup" />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/verify/:id/:hash" component={Reset} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

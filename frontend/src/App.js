import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import LandingPage from "./views/LandingPage/LandingPage";
import Admin from "./views/Admin/Admin";

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login}/>
          <Route path="/signUp" component={SignUp} />
          <Route path="/welcome" component={LandingPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
    </Router>
  );
};

export default App;

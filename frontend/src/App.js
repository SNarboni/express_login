import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import LandingPage from "./views/LandingPage/LandingPage";
import UserPage from "./views/UserPage/UserPage";
import Admin from "./views/Admin/Admin";

const App = () => {
  const [verifyToken, setVerifyToken] = useState(localStorage.getItem("token"));

  const checkToken = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={SignUp} />
          {verifyToken ? (
            <>
              <Route path="/welcome" component={LandingPage} />
              <Route path="/admin" component={Admin} />
              <Route path="/userPage/:id" component={UserPage} />
              <Route path="/login">
                <Login check={checkLocalStorage} />
              </Route>
            </>
          ) : (
            <Route path="*">
              <Login check={checkLocalStorage} />
            </Route>
          )}
        </Switch>
      </Router>
    );
  };

  const checkLocalStorage = () => {
    let token = localStorage.getItem("token");
    if (token) {
      setVerifyToken(true);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, [verifyToken]);

  return checkToken();
};

export default App;
